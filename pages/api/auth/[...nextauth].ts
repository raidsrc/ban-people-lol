import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"

const twitter_oauth2_id = process.env.TWITTER_OAUTH2_ID || ""
const twitter_oauth2_secret = process.env.TWITTER_OAUTH2_SECRET || ""

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    TwitterProvider({
      clientId: twitter_oauth2_id,
      clientSecret: twitter_oauth2_secret,
      version: "2.0",
    })
    // ...add more providers here
  ],
})
