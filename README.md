# NoteTaker

This is my final project for [CS 6460: Educational Technology](http://www.omscs.gatech.edu/cs-6460-educational-technology) offered at [Georgia Tech](http://www.gatech.edu)

[Link to final paper](documents/final_project.pdf)  
[Link to video demo](https://youtu.be/8KLFm-z_aFk)

## Usage

### Using Chrome Extension
To use the app, you will need to install a chrome extension:

1. clone/download the repo
2. Open chrome -> Menu -> More Tools -> Extensions
3. Toggle the `Developer mode` **on**
4. Click `LOAD UNPACKED` button
5. Navigate to the `repo/chrome-ext` folder

The extension will become active when the user is in the Udacity's classroom page `https://classroom.udacity.com/courses/.*/lessons/`.

### Using Web App
You can also use the app without installing the chrome extension by visiting [https://kliu99.github.io/NoteTaker/](https://kliu99.github.io/NoteTaker/).

### Sample note
You can import a sample note located in the `documents/Big_Buck_Bunny.json`

### Data
All your data are stored locally on your machine. You can download the note as `json` file to store and share.



## Development

### Libraries

- [React](https://reactjs.org/) -- a popular MVC JavaScript library developed and maintained by Facebook.
- [GoldenLayout](https://golden-layout.com/) -- a layout management library developed and maintained by deepstreamHub GmbH.
- [Dexie.js](http://dexie.org/) -- a minimalistic IndexedDB wrapper by David Fahlander.
- [ReactPlayer](https://github.com/CookPete/react-player) -- a React component for playing videos developed by CookPete.
- [Slate.js](http://slatejs.org) -- a completely customizable framework for building rich text editors.
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/) -- an HTML5 saveAs() FileSaver implementation using JavaScript.
- [html-docx-js](https://github.com/evidenceprime/html-docx-js) -- a JavsScript library that converts HTML documents to DOCX in the browser.
- [html2pdf](https://github.com/eKoopmans/html2pdf) -- a client-side HTML-to-PDF rendering library using pure JavsScript.
- [Semantic UI React](https://react.semantic-ui.com/) --  a UI component framework based around useful principles from natural language.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Some useful scripts
- For local deployment `npm run start`
- To build `npm run build --prod`
