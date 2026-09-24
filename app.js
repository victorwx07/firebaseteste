const firebaseConfig = {
  apiKey: "AIzaSyDDec7A6xIvjq1IlNn7M9n76_W5pCprnEE",
  authDomain: "senai-teste-a319e.firebaseapp.com",
  projectId: "senai-teste-a319e",
  storageBucket: "senai-teste-a319e.firebasestorage.app",
  messagingSenderId: "155757975429",
  appId: "1:155757975429:web:a2a978239c7f750c8b96ec"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ experimentalForceLongPolling: true });

async function addData() {
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;

  try {
    const docRef = await db.collection('users').add({
      name: name,
      age: Number.parseInt(age, 10)
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}

async function getData() {
  try {
    const querySnapshot = await db.collection('users').get();
    const dataList = document.getElementById('data-list');
    dataList.innerHTML = '';

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const listItem = document.createElement('li');
      listItem.textContent = `${data.name}, ${data.age}`;
      dataList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
}

window.addData = addData;
window.getData = getData;