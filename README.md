# Chat3813

## Sean Fowers - s5181954

# Git

The Git Repo containers the front-end and back-end portions in one folder to keep everything organised and together in the single repo. In the CHAT3813 folder, navigate to the Server folder to find everything related to the server code.
I used only the basic push and pull features of git, as most of my work felt straightforward. I could have used the branching feature for when I updated the server to use Mongo, but i did not feel like it required its use.

# Data Structures

There are two main Data Structures being used throughout this project.
User which consists of:

- id:number
- email:string
- username:string
- permission:string
- avatar:string
- pwd:string

There are the basic details of a user profile. Use email or username to login, and the permission grants you access depending on if you are a 'user', 'group admin' or a 'super admin'.
There was a recommended structure for User which i split into Group which i felt i could conceptualise it easier with this.

Group consists of:

- id:number
- groupname:string
- admins:string[]
- users:string[]
- applied:string[]
- channels:string[]

ID and groupname are unique identifiers for each group.
The admin array holds which users are admins in each group.
The user array holds each user of the group.
The applied array holds users which have to be approved by an admin to join the group.
The channels array which holds the different chat channels of the group.

A group admin or a super admin can create a group and delete a group.
An admin of the group must approve of which users are allowed access to the group.
All users of a group can access all channels.
A super admin can join any group without needing approval.

Users can be promoted to group admin and super admin by a super admin.
The super admin must navigate to the account page and then navigate to the super controls page.

Users can change their username or emails and can delete their account.

# MONGO DATABASE

Serverside code now fully utilises a mongo database.
The mongo database Chat3813 uses two collections, "users" and "groups".
The collections follow the same data structures as listed above. Backend routes are easily updated
and changed with the new MongoDB. It's addition allows for quicker data retrieval and an easier way
to handle any requests.

# REST API

Routes:

- /api/creategroup
  - creates a new group
  - parameters
    - groupname:string
    - username: string
  - returns
    - group:Group class
- /api/updategroup
- /api/deletegroup
  - deletes the group
  - parameters
    - group:Group class
  - returns
    - string "group deleted"
- /api/getgroups
  - gets every group
  - paramters
    - none
  - returns
    - group:Group[] class array
- /api/signup
  - adds new user to users collection.
  - parameters
    - email:string
    - username: string
    - pwd:string
  - returns
    - user:User class
- /api/login
  - checks input credentials against stored users.
  - parameters
    - email:string (can be email or username)
    - pwd:string
- /api/deleteuser
  - deletes user
  - parameters
    - user:User class
  - returns
    - string "User deleted successfully"
- /api/getusers
  - get all users (password is cleared before return)
  - parameters
    - none
  - returns
    - user:User[] class array
- /api/updateuser
  - updates email, username and permission of user.
  - parameters
    - user:User class
  - returns
    - user:User class
- /api/upload
  - uploads an image to the server allowing access throughout the site.
  - returns
    - Object{
      result:string indicating upload result
      data: Object {filename:string for image name, size:num for image size},
      numberOfImages:num = 1 indicating number of images uploaded. Should be 1 on success.
      message::string
      }

These are accessed through the auth service and the group service in the angular program.

# Sockets

Sockets has been implemented and is used for the purpose of communicating information between clients. For this project is has been used for a realtime chatting page on the website, where users can send and recieve messages in specified channels of each group they are apart of. Sockets also handles some of the information used for streaming video, and starting/ending calls made on the chat page.

# Tests

Tests using mocha and chai have been implemented on the backend serverside code. Each route used has been tested and updated to ensure they function exactly as expected. New error messages on the frontend website have been implemented due to these tests.

Testing on the angular side code has not been implemented.

# Angular Architecture

## Components

- app
  - Displays the nav bar, linking to other pages.
  - Displays user account information such as their username and avatar to indicate they are logged in.
  - Displays the users current groups that they are members of for quick navigation to them.
- account
  - displays the account information, allows user to change details or delete their account.
  - user can upload an avatar (image) to display on their account page and when they are chatting.
  - Super admins navigate to super-controls component from here.
- chat
  - Realtime chatrooms using sockets.
  - Users join a chat channels after joining a channel from the group page.
  - Users are notified when a new person joins the channel.
  - User messages are displayed with their username, avatar current date/time and their message.
  - Video calls are available on this page.
  - A user can begin streaming their camera or their screen.
  - Once streaming, users can click on their id to call them.
  - Users can end the call/video stream.
- group
  - Displays the individual group details and navigation to different channels
  - admins can allow users to join or promote them to admins
  - admins can create new channels
  - admins can delete the group
- groups
  - displays all groups and groups the current user is in currently.
  - admins can create new groups
  - all users can navigate to the individual groups
  - if not part of a group, clicking on it will add them to the applied list of each group.
- login
  - login page
- signup
  - non logged in users can signup with an account.
  - usernames are checked for uniqueness, no duplicates allowed.
- super-controls
  - only super admins can navigate to it from the account page
  - super admins can update permissions or all users to group or super admin

## Services

There are 2 services used throughout this project. The application service and sockets service are placeholder for the time being, and are not used in the project at this time.

- auth service
  All user related data is passed through the auth service, which accesses the server API.
  - isLoggedin()
    - check if currentuser is logged in
  - signup(email:string, username:string, pwd:string)
    - signup with given details
  - login(email:string, pwd:string)
    - checks credentials to login to website
  - updateUser(user:User)
    - update user with given details
  - logout(event:any)
    - logs user out of the website, navigates to login page
  - setCurrentUser(newuser:any)
    - sets currentuser into session storage for retrieval in each component
  - getCurrentUser()
    - gets currentuser in session storage
  - getAllUsers()
    - gets all users as user array in system
  - deleteUser(user:user)
    - deletes given user
- group service
  All group related data is passed through the group service, which accesses the server API.
  - createGroup(groupname:string, username:string)
    - creates a new group
  - updateGroup(group:Group)
    - updates details of a group
  - getAllGroups()
    - gets all groups in system
  - setCurrentGroup(group:any)
    - sets current group into session storage (to load in group component)
  - removeCurrentGroup(event:any)
    - removes current group from session storage
  - deleteGroup(group:Group)
    - deletes group

## Models

- User
  - id:number
  - username:string
  - email:string
  - pwd:string
  - permission:string
  - avatar:string
- Group
  - id:number
  - groupname:string
  - admins:string[]
  - users:string[]
  - channels:string[]
  - applied:string[]
