import NextAuth, { AuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

// Let ESLint know about the environment variables
// These are either defined in the .env.local file during development
// or, when deployed, in the configuration settings of the hosting service.
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			AZURE_AD_CLIENT_ID: string;
			AZURE_AD_CLIENT_SECRET: string;
			AZURE_AD_TENANT_ID: string;
		}
	}
}

export const authOptions: AuthOptions = {
	// Configure one or more authentication providers
    // https://next-auth.js.org/configuration/providers/oauth#built-in-providers
	providers: [
        // https://next-auth.js.org/providers/azure-ad
		AzureADProvider({
			clientId: process.env.AZURE_AD_CLIENT_ID,
			clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
            // "For instance, when the intended access is for a personal account,
            // the tenant ID should not be provided."
			// tenantId: process.env.AZURE_AD_TENANT_ID,
		}),
	],
    session: {
        maxAge: 12 * 60 * 60, // 12 hours
        strategy: "jwt" // Use JSON Web Tokens for session management
    },
    callbacks: {
        async signIn({user, account, profile}): Promise<string | boolean> {
            console.log(`🎉 User '${user.email}' just signed in!`);
            return true;
        },
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
