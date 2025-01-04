// Importação dos módulos do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCnNeNYqIL1WF7lsbI4uZlD_Vska8ZUNTU",
    authDomain: "projeto-apis-de-tribunal.firebaseapp.com",
    projectId: "projeto-apis-de-tribunal",
    storageBucket: "projeto-apis-de-tribunal.firebasestorage.app",
    messagingSenderId: "1015047282147",
    appId: "1:1015047282147:web:3bf786028ac853675854d6",
    measurementId: "G-8N95LET0N7",
};

// Inicializa o Firebase e o Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para salvar um novo número de processo
document.getElementById('process-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const processNumber = document.getElementById('process-number').value;

    if (processNumber) {
        try {
            // Adiciona o número do processo à coleção "processes"
            await addDoc(collection(db, "processes"), { number: processNumber });

            // Atualiza a lista de processos na página
            displayProcesses();
            document.getElementById('process-form').reset(); // Limpa o formulário
        } catch (error) {
            console.error('Erro ao salvar o processo:', error);
        }
    }
});

// Função para exibir os números de processos salvos
async function displayProcesses() {
    const processList = document.getElementById('processes');
    processList.innerHTML = '';

    try {
        // Recupera os processos da coleção "processes"
        const querySnapshot = await getDocs(collection(db, "processes"));
        querySnapshot.forEach((doc) => {
            const listItem = document.createElement('li');
            listItem.textContent = doc.data().number;
            processList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro ao carregar os processos:', error);
    }
}

// Exibe os processos ao carregar a página
document.addEventListener('DOMContentLoaded', displayProcesses);
