class Modal {
    constructor() {
        if (document.querySelector(".modal-overlay") == null)
            this.createOverlay();

        this.overlay = document.querySelector(".modal-overlay");
        this.overlay.addEventListener("click", this.toggleModal.bind(this));

        this.modals = [{
            modalTitle: "title",
            modalContent: "content"
        },];

        this.modalsToggler();
        this.drawUI();
    }

    createOverlay() {
        const overlay = document.createElement("div");
        overlay.classList.add("modal-overlay");
        document.body.prepend(overlay);
    }

    toggleOverlay() {
        this.overlay.classList.toggle("active");
    }

    createModal(modalName, modalContent = false, modalClass = false) {
        const modal = document.createElement("div");

        modal.classList.add("modal-box");

        if (modalClass) modal.classList.add(modalClass);
        if (modalContent) modal.innerHTML = modalContent;

        modal.setAttribute("data-modal-name", modalName);
        this.overlay.after(modal);
    }

    modalsToggler() {
        const togglers = document.querySelectorAll("[data-modal-toggler]");

        if (togglers.length < 1)
            return false;

        togglers.forEach(toggler => {
            const modalName = toggler.getAttribute("data-modal-toggler");
            toggler.addEventListener("click", () =>
                this.toggleModal(modalName));

        });
    }

    drawUI() {
        const modalBoxes = document.querySelectorAll("[data-modal-name]");

        if (modalBoxes.length < 1)
            return false;

        modalBoxes.forEach(modalBox => {
            const modalCloseBtn = document.createElement("i");
            modalCloseBtn.className = "fas fa-times-circle modal-close-btn";
            modalCloseBtn.addEventListener("click", () => this.toggleModal());

            modalBox.appendChild(modalCloseBtn);
        });
    }

    toggleModal(modalName) {
        if (typeof modalName === "string") {
            const modalToOpen = document.querySelector(`[data-modal-name="${modalName}"]`);
            modalToOpen.classList.toggle("active");
        } else {
            const modalToClose = document.querySelector(".modal-box.active");
            modalToClose.classList.toggle("active");
        }

        this.toggleOverlay();
    }
}