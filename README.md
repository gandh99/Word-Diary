# Word-Diary
A MERN application to record new words that you learn.

[Curious? Check out the app for yourself!]()

[Here's all you need to do to run the project on your computer.](#runProject)

## Technologies and Frameworks
- Front-end:
  - ReactJS
  - MaterialUI (and some Bootstrap)
  - Redux
  - Axios
  - Socket.io
- Back-end:
  - NodeJS run-time for the main server and the authentication server
  - ExpressJS
  - @vitalets/google-translate-api
  - MongoDB and Mongoose for the database
  - Bcrypt
  - PassportJS
  - JWT
  - Socket.io
  
## Screenshots
**1. The login page of Word Diary.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/login.png" alt="alt text" width="100%" height="50%">

**2. The home page after logging in. The views are slightly different between desktop and mobile.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/home_desktop.png" alt="alt text" width="100%" height="50%">
<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/home_mobile.png" alt="alt text" width="30%" height="70%">

**3. Your diary starts off empty, so click on the floating action button on the bottom right hand corner to add a post to your diary. Fill in a word or phrase and click on the Google Translate icon to automatically generate a translation for it. The translation is only to English.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/add_word.png" alt="alt text" width="100%" height="50%">

**4. Your new words appear in your diary.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/diary_page_all.png" alt="alt text" width="100%" height="50%">

**5. You can choose to "star" your posts, which will cause them to appear in the Starred tab.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/diary_page_starred.png" alt="alt text" width="100%" height="50%">

**6. Word Diary becomes more interesting when you add your friends. Currently you have none.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/friends_page_all_1.png" alt="alt text" width="100%" height="50%">

**7. Use the floating action button on the bottom right hand corner to search for a user and send a friend request.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/add_friend.png" alt="alt text" width="100%" height="50%">

**8. From the perspective of your friend, they will receive a notification for a pending friend request.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/friend_request_notification.png" alt="alt text" width="100%" height="50%">

**9. They can navigate to the Pending tab in the Friends page to accept your friend request.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/friends_pending.png" alt="alt text" width="100%" height="50%">

**10. When they accept your friend request, it will show up in your friends page.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/friends_page_all_2.png" alt="alt text" width="100%" height="50%">

**11. You may view your friend's diary to learn some new words from them.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/friends_diary.png" alt="alt text" width="100%" height="50%">

**12. You may also share some of your posts with your friend by clicking on the Share button on an individual post.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/share_post.png" alt="alt text" width="100%" height="50%">

**13. Your friend will receive a notification for a shared post, and if they accept it, the post will show up in their own diary.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/received_shared_post.png" alt="alt text" width="100%" height="50%">


## How to View This Project<a name="runProject"></a>

In the `/server` directory, run:

### `npm run dev`

This runs the app in the development mode, starting the React app, the main NodeJS server, and the authentication server.<br />
The React app should automatically open in your browser. If it does not open, go to [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

