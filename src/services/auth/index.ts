import NextAuth, {NextAuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {PrismaAdapter} from '@auth/prisma-adapter'
import { prisma } from '../database'

const nextAuthOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/auth',
        signOut: '/auth',
        error: '/auth',
        newUser: '/app',
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials, req) {
                return null
            }
        })
    ]
}

export const handler = NextAuth(nextAuthOptions)