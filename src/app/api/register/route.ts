import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request){

    const {email, password} = await req.json()

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(user){
        return NextResponse.json({error: "User already exists"}, {status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword
        }
    })

    return NextResponse.json(newUser)
}