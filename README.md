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
**1. The login page.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/login.png" alt="alt text" width="100%" height="50%">

**2. The homepage of Word Diary, available in both Desktop and Mobile versions.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/home_desktop.png" alt="alt text" width="100%" height="50%">
<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/home_mobile.png" alt="alt text" width="30%" height="50%">

**3. The friends page.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/friends_page_all_1.png" alt="alt text" width="100%" height="50%">

**4. Adding a friend.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/add_friend.png" alt="alt text" width="100%" height="50%">

**5. Your friend will receive a real-time friends request notification.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/friend_request_notification.png" alt="alt text" width="100%" height="50%">

**6. Your friend can then choose to accept the pending friend request.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/friends_pending.png" alt="alt text" width="100%" height="50%">

**7. If they accept your friend request, they will show up on your friends page.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/friends_page_all_2.png" alt="alt text" width="100%" height="50%">

**8. You can then view your friend's diary.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/friends_diary.png" alt="alt text" width="100%" height="50%">

**9. Adding a word to your diary. Click translate to get a translated version of the word you are adding.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/add_word.png" alt="alt text" width="100%" height="50%">

**10. The new word shows up on your diary page. You can also choose to star this diary post.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/diary_page_all.png" alt="alt text" width="100%" height="50%">

**11. Starred diary posts go to a separate tab.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/diary_page_starred.png" alt="alt text" width="100%" height="50%">

**12. Share your diary post with a friend.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/share_post.png" alt="alt text" width="100%" height="50%">

**13. Your friend will receive the shared diary post and can accept it, which adds the post to their own diary.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/received_shared_post.png" alt="alt text" width="100%" height="50%">

**14. Similarly, your friend can share their diary post with you.**

<img src="https://github.com/gandh99/Word-Diary/blob/master/screenshots/diary_shared_with_me.png" alt="alt text" width="100%" height="50%">


## How to View This Project<a name="runProject"></a>

In the `/server` directory, run:

### `npm run dev`

This runs the app in the development mode, starting the React app, the main NodeJS server, and the authentication server.<br />
The React app should automatically open in your browser. If it does not open, go to [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

