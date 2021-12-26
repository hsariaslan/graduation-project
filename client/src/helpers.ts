import CryptoJS from "crypto-js";

const helpers = {
    isNull: function (variable: any) {
        return typeof (variable) === 'undefined' || variable === null || variable === 'null' || variable === '' || variable === [] || variable.length === 0;
    },

    isNotNull: function (variable: any) {
        return typeof (variable) !== 'undefined' && variable !== null && variable !== 'null' && variable !== '';
    },

    decrypt: function (data: string) {
        const apiCryptKey: string = <string>process.env.REACT_APP_CRYPT_KEY;
        const key = CryptoJS.enc.Utf8.parse(apiCryptKey);
        let decrypt = CryptoJS.AES.decrypt(data, key, {mode: CryptoJS.mode.ECB});
        let stringDecrypt = decrypt.toString(CryptoJS.enc.Utf8);

        // replaces string type of array data to real array
        return stringDecrypt.replace(/^\[+|"+|{+|\[+|]+|}+|\\+|u0000+|\*+|items+|:+|]+$/g, '').split(',');
    },

    decryptStorageData: function (data: string, storageType: string = 'session') {
        if (storageType === 'local') {
            return this.decrypt(<string>localStorage.getItem(data));
        } else {
            return this.decrypt(<string>sessionStorage.getItem(data));
        }
    },

    getUserDataFromStorage: function () {
        const userStorageNamePrefix:string = process.env.REACT_APP_STORAGE_NAME + '_user_' as string;
        let user = {
            email: "",
            name: "",
            surname: "",
            role: "",
        };
        let userEmail: string = <string>localStorage.getItem(userStorageNamePrefix + 'email');

        if (this.isNull(userEmail)) {
            userEmail = <string>sessionStorage.getItem(userStorageNamePrefix + 'email');

            if (this.isNotNull(userEmail)) {
                user.email = this.decrypt(userEmail).toString();
                user.name = this.decryptStorageData(userStorageNamePrefix + 'name').toString();
                user.surname = this.decryptStorageData(userStorageNamePrefix + 'surname').toString();
                user.role = this.decryptStorageData(userStorageNamePrefix + 'role').toString();
            }
        } else {
            user.email = this.decrypt(userEmail).toString();
            user.name = this.decryptStorageData(userStorageNamePrefix + 'name', 'local').toString();
            user.surname = this.decryptStorageData(userStorageNamePrefix + 'surname', 'local').toString();
            user.role = this.decryptStorageData(userStorageNamePrefix + 'role', 'local').toString();
        }

        return user;
    },
}

export default helpers;
