import { toastController } from '@ionic/vue';

export default {
    async registerToast () {
        const toast = await toastController
            .create({
                message: "Compté créé, vous pouvez vous connecter !",
                position: "bottom",
                color: "secondary",
                duration: 1250
            })
        return toast.present();
    },
    async loginToast () {
        const toast = await toastController
            .create({
                message: "Connecté !",
                position: "bottom",
                color: "secondary",
                duration: 1250
            })
        return toast.present();
    },
    async addTransactionToast () {
        const toast = await toastController
            .create({
                message: "Transaction ajoutée !",
                position: "bottom",
                color: "success",
                duration: 1250
            })
        return toast.present();
    },
    async updateTransactionToast () {
        const toast = await toastController
            .create({
                message: "Transaction mise à jour !",
                position: "bottom",
                color: "success",
                duration: 1250
            })
        return toast.present();
    },
    async deleteTransactionToast () {
        const toast = await toastController
            .create({
                message: "Transaction supprimée",
                position: "bottom",
                color: "danger",
                duration: 1500
            })
        return toast.present();
    },
}