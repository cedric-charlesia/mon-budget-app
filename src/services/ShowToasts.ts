import { toastController } from '@ionic/vue';

export default {
    async registerToast () {
        const toast = await toastController
            .create({
                message: "Compté créé, vous pouvez vous connecter !",
                position: "top",
                color: "secondary",
                duration: 1500
            })
        return toast.present();
    },
    async loginToast () {
        const toast = await toastController
            .create({
                message: "Connecté !",
                position: "top",
                color: "secondary",
                duration: 1500
            })
        return toast.present();
    },
    async addTransactionToast () {
        const toast = await toastController
            .create({
                message: "Transaction ajoutée !",
                position: "top",
                color: "success",
                duration: 1500
            })
        return toast.present();
    },
    async updateTransactionToast () {
        const toast = await toastController
            .create({
                message: "Transaction mise à jour !",
                position: "top",
                color: "success",
                duration: 1500
            })
        return toast.present();
    },
}