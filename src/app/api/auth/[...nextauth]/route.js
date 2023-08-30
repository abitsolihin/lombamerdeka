import Users from '@/models/user/user';
import connect from '@/utils/db';
import NextAuth from 'next-auth';
import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOption = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            async authorize(credentials) {
                await connect();

                try {
                    const user = await Users.findOne({ username: credentials.username });

                    if (user) {
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        if (isPasswordCorrect) {
                            return {
                                nama: user.nama,
                                username: user.username,
                            };
                        } else {
                            throw new Error('Wrong credentials');
                        }
                    } else {
                        throw new Error('User Not Found');
                    }
                } catch (error) {
                    throw new Error(error.message);
                }
            },
        }),
    ],
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60,
    },
    jwt: {
        signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    },
    callbacks: {
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    },
    pages: {
        error: '/login',
    },
}

const handler = NextAuth(authOption)

export { handler as GET, handler as POST }; 