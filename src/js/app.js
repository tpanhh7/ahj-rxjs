import getMessagesPolling from "./api.js";
import { formatDate, truncateSubject } from "./formatDate.js";

export default class App {
  constructor() {
    this.messagesBody = document.getElementById("messages-body");
    this.initPolling();
  }

  initPolling() {
    getMessagesPolling().subscribe({
      next: (response) => {
        if (response.messages && response.messages.length > 0) {
          this.addMessages(response.messages);
        }
      },
      error: (err) => {
        console.error("Polling error:", err);
      },
    });
  }

  addMessages(messages) {
    messages.reverse().forEach((message) => {
      const row = document.createElement("tr");

      const fromCell = document.createElement("td");
      fromCell.textContent = message.from;

      const subjectCell = document.createElement("td");
      subjectCell.textContent = truncateSubject(message.subject);

      const dateCell = document.createElement("td");
      dateCell.textContent = formatDate(message.received);

      row.append(fromCell);
      row.append(subjectCell);
      row.append(dateCell);

      this.messagesBody.insertBefore(row, this.messagesBody.firstChild);
    });
  }
}
