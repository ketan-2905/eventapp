// import type { NextAuthConfig } from "next-auth";
// import Google from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";
// import { prisma } from "./prisma";
// import { compare } from "bcryptjs";

// export default {
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       authorization: {
//         params: {
//           scope: "openid email profile",
//         },
//       },
//     }),
//     Credentials({
//       async authorize(credentials) {
//         const identifier = credentials?.identifier;
//         const password = credentials?.password;

//         if (
//           !identifier ||
//           typeof identifier !== "string" ||
//           !password ||
//           typeof password !== "string"
//         ) {
//           return null;
//         }

//         const user = await prisma.user.findFirst({
//           where: {
//             OR: [{ email: identifier}],
//           },
//         });

//         if (!user || !user.password || typeof user.password !== "string") {
//           return null;
//         }

//         const isValid = await compare(password, user.password); // ✅ now both are strings

//         if (!isValid) {
//           return null;
//         }

//         return user;
//       },
//     }),
//   ],
// } satisfies NextAuthConfig;


// auth.config.ts
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { compare } from "bcryptjs";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        },
      },
    }),
    Credentials({
      name: "credentials",
      credentials: {
        identifier: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const identifier = credentials?.identifier;
        const password = credentials?.password;

        if (
          !identifier ||
          typeof identifier !== "string" ||
          !password ||
          typeof password !== "string"
        ) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            OR: [{ email: identifier }],
          },
        });

        if (!user || !user.password || typeof user.password !== "string") {
          return null;
        }

        const isValid = await compare(password, user.password);

        if (!isValid) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // If signing in with Google
      if (account?.provider === "google") {
        const { email } = user;
        
        // Check if a user already exists with this email
        const existingUser = await prisma.user.findUnique({
          where: { email: email as string },
        });

        if (existingUser) {
          // Check if Google account is already linked
          const existingAccount = await prisma.account.findFirst({
            where: {
              userId: existingUser.id,
              provider: "google",
            },
          });

          if (!existingAccount) {
            // Link Google account to existing user
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
              },
            });
          }
          
          // Update user object to use existing user ID
          user.id = existingUser.id;
        }
      }
      
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
} satisfies NextAuthConfig;