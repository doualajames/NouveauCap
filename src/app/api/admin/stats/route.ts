import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { requireAuth, isAdmin } from '@/lib/auth-jwt'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult instanceof Response) {
      return authResult
    }
    if (!isAdmin(authResult)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const totalUsers = await prisma.user.count()
    
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const activeUsers = await prisma.user.count({
      where: { updatedAt: { gte: thirtyDaysAgo } }
    })
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const newUsersToday = await prisma.user.count({
      where: { createdAt: { gte: today } }
    })
    
    const premiumSubscribers = await prisma.user.count({
      where: { subscriptionTier: { not: 'FREE' } }
    })
    
    const freeUsers = totalUsers - premiumSubscribers
    const premiumUsers = await prisma.user.count({ where: { subscriptionTier: 'PREMIUM' } })
    const familyUsers = await prisma.user.count({ where: { subscriptionTier: 'FAMILLE' } })
    const monthlyRevenue = (premiumUsers * 19.99) + (familyUsers * 39.99)
    
    const signupsPerDay = []
    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)
      const nextDate = new Date(date)
      nextDate.setDate(nextDate.getDate() + 1)
      const count = await prisma.user.count({
        where: { createdAt: { gte: date, lt: nextDate } }
      })
      signupsPerDay.push({ day: dayNames[date.getDay()], count })
    }
    
    const usersByStatus = await prisma.user.groupBy({
      by: ['immigrationStatus'],
      _count: true
    })
    
    const usersByProvince = await prisma.user.groupBy({
      by: ['province'],
      _count: true
    })
    
    const allTasks = await prisma.task.findMany({ select: { status: true } })
    const taskStats = {
      completed: allTasks.filter(t => t.status === 'COMPLETED').length,
      pending: allTasks.filter(t => t.status === 'PENDING').length,
      inProgress: allTasks.filter(t => t.status === 'IN_PROGRESS').length
    }
    
    return NextResponse.json({
      totalUsers, activeUsers, newUsersToday, premiumSubscribers, freeUsers,
      monthlyRevenue, signupsPerDay,
      usersByStatus: usersByStatus.map(s => ({ status: s.immigrationStatus, count: s._count })),
      usersByProvince: usersByProvince.map(p => ({ province: p.province, count: p._count })),
      taskStats
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json({ 
      totalUsers: 0, activeUsers: 0, newUsersToday: 0, premiumSubscribers: 0, freeUsers: 0,
      monthlyRevenue: 0, signupsPerDay: [], usersByStatus: [], usersByProvince: [],
      taskStats: { completed: 0, pending: 0, inProgress: 0 }
    })
  }
}
