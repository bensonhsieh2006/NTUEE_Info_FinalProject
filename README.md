<h1 align="center">Calendar and Todolist</h1>

![Website Deploy]()
![License]()

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



[[📖 Introduction 📖]](#introduction)　　　[[🔧 Tech Stack 🔧]](#tech-stack)　　　[[🌟 Feature 🌟]](#feature)　　　[[🎺 Run the app 🎺]](#running-the-app)　　　[[🚚 Deploy 🚚]](#deploy)　　　[[💡 Reference 💡]](#reference)　　　[[⚠️ Disclaimer ⚠️]](#disclaimer)



## <a name="introduction"> Introduction 📖</a>

##### Calendar

- Add your events and set the time on your calendar !
![Calendar](/public/img/Calendar.jpg)

##### Todolist

- List all your to-do items and complete them !
![Todolist](/public/img/Todolist.jpg)


## <a name="tech stack"> Tech Stack 🔧</a>

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


## <a name="Deploy"> Deploy 🚚</a>

- The app has been deployed on ...


## <a name="reference"> Reference 💡</a>


**1. [NTUEEInfoDep 05-TwitterClone](https://github.com/NTUEEInfoDep/05-TwitterClone)
2. [Shadcn](https://ui.shadcn.com/)
3. [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)**


## <a name="disclaimer"> Disclaimer ⚠️ </a>

This project is for NTUEE Info Final Project only. 
Please mark the origin clearly if you want to cite the project.