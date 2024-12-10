Requirements met:
🎯 Set up user sign-up and user login using Clerk.
🎯 Enable users to create a user profile, and input profile information (such as a user biography) using a form. Users and user information should be stored in their own table in the database and handled with an appropriate route (e.g. /user/[userId]).
🎯 Enable users to create posts associated with their Clerk userId. Posts should be displayed on the user’s profile page.

Requirements not met:
🎯 Create and display an error page if the user visits a user profile that doesn’t exist.
🎯 Use 1 or more Radix UI Primitive or something similar (e.g. use of another library to enhance UX).

Challenges I faced:

Using props to pass around arguments and server actions.

Separating client and server components was difficult as postForm.jsx uses a server action to submit posts. I used props to pass the server action to the client component: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#client-components.

Passing the id from the dynamic route for posts into the server action using hidden input fields. https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations. Important to note that this method should not be used for passing user sensitive information (e.g. user_id).

Obtaining the clerk id for a server action. https://clerk.com/docs/references/nextjs/server-actions.
