# LearnTeX

![LearnTex_Logo_Alt](https://user-images.githubusercontent.com/25762130/57512355-63d6c500-72d9-11e9-80ea-c5a879674829.png)

LearnTeX interactive web application built to help individuals learn the basics of using LaTeX.  This project was created by [Noah Alderton](https://github.com/nalderto), [Joseph Barr](https://github.com/JosephMBarr), and [J.T. Singhal](https://github.com/JTSinghal) for Purdue University's CS 252 (Systems Programming) course.    

## Setup Instructions
Simply add the appropriate Firebase API information in src/environments/environment.prod.ts and src/environments/environment.ts.

Also, make sure Firestore contains a lessons collection, containing documents for each of the lessons.  Each lesson document should contain:
* "content" (html document of each lesson found in lessons folder)
* "number" ("Lesson 0" for example)
* "solution" (The LaTeX solution to the assignment)
* "title" (Title of the lesson; "Font Effects" for example)