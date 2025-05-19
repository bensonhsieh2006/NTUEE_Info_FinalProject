<h1 align="center">Calendar and Todolist</h1>

![Website Deploy](https://deploy-badge.vercel.app/?url=https://ntuee-info-final-project.vercel.app/&name=Calendar_and_Todolist)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Table of Contents

 [[📖 Introduction 📖]](#introduction)　　　[[🔧 Tech Stack 🔧]](#tech-stack)　　　[[🌟 Feature 🌟]](#feature)　　　[[🎺 Run the app 🎺]](#run-the-app)
 
 [[🚚 Deploy 🚚]](#deploy)　　　[[💡 Reference 💡]](#reference)　　　[[⚠️ Disclaimer ⚠️]](#disclaimer)　　　[[🎀 Reflection 🎀]](#reflection)


## <a name="introduction"> Introduction 📖</a>

#### Calendar

- Add your events and set the time on your calendar !
![Calendar](/public/img/Calendar.gif)

#### Todolist

- List all your to-do items and complete them !
![Todolist](/public/img/Todolist.gif)


## <a name="tech-stack"> Tech Stack 🔧</a>

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **ShadCN/UI**
- **Drizzle ORM**


## <a name="feature"> Feature 🌟</a>

👀 Dates that have events are displayed on the calendar.

🖊️ You can mark your events in various colors and add times.

📝 You can edit your to-do items or mark them as finished.


## <a name="run-the-app"> Running the app locally on your computer 🎺</a>

1. Install all required dependencies:

```bash
pnpn install
```
2. Create a `.env.local` file in the root of the project and add a _valid_ Postgres URL.

```
POSTGRES_URL= your_postgres_url
```

3. Run migration.
```bash
pnpm generate
pnpm migrate
```

4. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## <a name="deploy"> Deploy 🚚</a>

- The app has been deployed on [HERE](https://ntuee-info-final-project.vercel.app/)


## <a name="reference"> Reference 💡</a>


**1. [NTUEEInfoDep 05-TwitterClone](https://github.com/NTUEEInfoDep/05-TwitterClone)**

**2. [Shadcn](https://ui.shadcn.com/)**

**3. [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)**


## <a name="disclaimer"> Disclaimer ⚠️ </a>

This project is for NTUEE Info Final Project only. 
Please mark the origin clearly if you want to cite the project.


## <a name="reflection"> Reflection 🎀 </a>

name: 謝秉宸  
studentID: B13901186  
reflection: 這是我第一次寫後端的經驗，之前聽部長上課的時候覺得似乎沒有很困難，每個部分都聽起來很合理，但自己操作過一遍之後才發現有很多問題需要解決。這次的專題中，我不僅學到了更多寫網頁好用的工具，也對資料庫與前端的對接，以及對資料庫儲存、提取資料的流程有了更進一步的認識。

name: 楊曦磊  
studentID: B13901175  
reflection:  製作Final Project不僅讓我完整的了解一遍next.js大概的運作原理，以及一個簡單的網頁app的製作過程。其中也遇到了困難像是操作後必須手動刷新頁面才能更新顯示的問題，問了隊友和學長後改寫了方法，最後終於解決了問題。總而言之，這次的project和兩個學期的部課收穫很多，雖然有時上課會聽不太懂，但我覺得只要自己試著動手做一定能解決很多疑惑。
