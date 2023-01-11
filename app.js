let vm = new Vue({
    el: '#app',
    data: function () {
        return {
            dataMakanan: null,
            loading: true,
            error: false,


            nama: null,
            alamat: null
        }
    },
    methods: {
        saveMakanan: function () {
            let data = {
                nama: this.nama,
                alamat: this.alamat,

                status: true,
            }

            axios
                .post('https://projek-uas-iota.vercel.app/listBunga/', data)
                .then(res => {
                    this.dataMakanan = res
                    this.getMakanan()
                })
                .catch(err => {
                    console.log(err);
                })
        },

        getMakanan: function () {
            axios
                .get('https://uas-j421.vercel.app/ListMakanan')
                .then((response) => {
                    console.log(response.data);
                    this.dataMakanan = response.data
                    this.getMakanan()
                }).catch(err => {
                    console.log(err);
                    this.error = true
                })
                .finally(() => (this.loading = false))
        },



        deleteMakanan: function (id) {
            axios
                .delete('https://uas-j421.vercel.app/ListMakanan' + id)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    err
                })
        }
    },

    mounted() {
        this.getMakanan()
    }
})