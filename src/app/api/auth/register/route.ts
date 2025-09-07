import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const {
      name,
      phoneno,
      email,
      password,
      role,
      branchId,
      studentId,
      rollNumber,
      year,
      section,
    } = await req.json()

    if (!name || !phoneno || !email || !password || !branchId || !studentId || !rollNumber || !year || !section || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (!existingUser) {
      return NextResponse.json({ error: "User does not exist" }, { status: 404 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const branchRecord = await prisma.branch.findUnique({
      where: { id: branchId },
    })

    if (!branchRecord) {
      return NextResponse.json({ error: "Invalid branch ID" }, { status: 400 })
    }

    // ✅ Only update (no creation)
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        name,
        phoneno,
        password: hashedPassword,
        role: role || existingUser.role, // keep old role if not passed
        profileCompleted: true,
        branchId: branchRecord.id,
        studentId,
        rollNumber,
        year: parseInt(year),
        section,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneno: true,
        role: true,
        branch: { select: { name: true } },
        studentId: true,
        rollNumber: true,
        year: true,
        section: true,
        createdAt: true,
      },
    })

    return NextResponse.json(updatedUser, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
