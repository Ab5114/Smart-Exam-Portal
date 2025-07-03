# Smart Exam Portal

A complete **offline/local exam system** for colleges and institutions. Designed to work on LAN without requiring internet access, this smart portal ensures secure, real-time exam management, monitoring, and evaluation.


---

## 🛠️ Tech Stack

| Layer               | Technology                                       |
| ------------------- | ------------------------------------------------ |
| **Frontend**        | React.js, HTML, CSS, Axios, Service Workers      |
| **Backend**         | Node.js, Express.js                              |
| **Database**        | MongoDB (local instance or LAN-based sync)       |
| **Authentication**  | JWT (JSON Web Token) for secure role-based login |
| **Encryption**      | AES-256 for exam content, bcrypt for passwords   |
| **AI Assistant**    | OpenAI API (Chatbot), LangChain (context mgmt)   |
| **Deployment**      | Localhost with LAN support (for offline use)     |
| **Offline Support** | IndexedDB/LocalStorage, Background Sync          |

---

## 📸 Screenshots
 ![alt text](screenshots/SEP-Home.png)
 ![alt text](screenshots/SEP-dashboard.png)
![alt text](screenshots/SEP-Exams.png)
 

---


## 🚀 Key Features

🗃️ 1. Offline-First Architecture
Exams and student responses are locally cached (IndexedDB or LocalStorage), allowing users to continue work uninterrupted—even without internet.

Auto-sync functionality automatically uploads completed exams to the cloud once connectivity is restored.

🛂 2. Secure Exam Distribution
Role-based access differentiates between Admin and Student, ensuring only authorized actions.

Exam papers are stored encrypted (AES-256) on devices and protected with end-to-end encryption to prevent unauthorized access or leaks.

🤖 3. Real-Time Chat Support
An integrated AI assistant chatbot provides instant technical help throughout the exam, enabling students to resolve issues without needing human intervention.

Supports natural language queries, such as “Why is my timer not working?” or “How do I submit?” to reduce admin burden.

⏱️ 4. Adaptive Exam Management
Admins can create, edit, delete, and schedule exams via the secure dashboard.

Students start only when scheduled (based on date/time), with built-in timer warnings and auto-submit on timeout.

💾 5. Tamper-Proof Exam Integrity
Question papers and student responses are encrypted at rest, and file transfers (e.g., via USB or local network) maintain end-to-end encryption.

Detects changes in paper integrity by using content hashing before and after offline transfers.

---

## 🌟 Support

If you find this project useful or inspiring, please ⭐ the repo and share it with others!
