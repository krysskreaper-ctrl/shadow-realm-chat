// Chat application with file download functionality
class ShadowChat {
    constructor() {
        this.messages = [];
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.fileButton = document.getElementById('fileButton');
        this.fileInput = document.getElementById('fileInput');
        this.messagesContainer = document.getElementById('messages');
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        this.fileButton.addEventListener('click', () => {
            this.fileInput.click();
        });
        
        this.fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.sendFile(e.target.files[0]);
                e.target.value = '';
            }
        });
    }
    
    sendMessage() {
        const text = this.messageInput.value.trim();
        if (text) {
            this.addMessage({
                type: 'text',
                content: text,
                timestamp: new Date()
            });
            this.messageInput.value = '';
        }
    }
    
    sendFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.addMessage({
                type: 'file',
                fileName: file.name,
                fileSize: file.size,
                fileData: e.target.result,
                timestamp: new Date()
            });
        };
        reader.readAsDataURL(file);
    }
    
    addMessage(message) {
        this.messages.push(message);
        this.renderMessage(message);
        this.scrollToBottom();
    }
    
    renderMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = message.type === 'file' ? 'message file-message' : 'message';
        
        if (message.type === 'text') {
            messageElement.innerHTML = `
                <div>${this.escapeHtml(message.content)}</div>
                <div class="timestamp">${this.formatTime(message.timestamp)}</div>
            `;
        } else if (message.type === 'file') {
            messageElement.innerHTML = `
                <div>📎 File attached</div>
                <div class="file-attachment">
                    <div class="file-info">
                        <div class="file-name">${this.escapeHtml(message.fileName)}</div>
                        <div class="file-size">${this.formatFileSize(message.fileSize)}</div>
                    </div>
                    <button class="download-btn" data-file-data="${message.fileData}" data-file-name="${this.escapeHtml(message.fileName)}">
                        ⬇️ Download
                    </button>
                </div>
                <div class="timestamp">${this.formatTime(message.timestamp)}</div>
            `;
            
            const downloadBtn = messageElement.querySelector('.download-btn');
            downloadBtn.addEventListener('click', () => {
                this.downloadFile(message.fileData, message.fileName);
            });
        }
        
        this.messagesContainer.appendChild(messageElement);
    }
    
    downloadFile(dataUrl, fileName) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
    
    formatTime(date) {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize the chat application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ShadowChat();
});
