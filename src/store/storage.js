import { reactive } from 'vue'

export const cab = reactive({
    fid: 0,
    nav: ["at_risk", "internship", "feedback"],
    email: "",
    name: "",
    selectedNav: "",
    // nav: [],
    setFID(id) {
        this.fid = id;
        // console.log('this.fid' + this.fid)
    },
    setNav(feature) {
        this.nav.push(feature);
        // console.log('this.fid' + this.fid)
    },
    setName(fname) {
        this.name = fname;
        // console.log('this.fid' + this.fid)
    },
    setEmail(address) {
        this.email = address;
        // console.log('this.fid' + this.fid)
    },
    setSelectedNav(sNav) {
        this.selectedNav = sNav;
        // console.log('this.fid' + this.fid)
    },
    isNav(feature) {

        let ft = false;

        if(this.nav.indexOf(feature) !== -1){

            ft = true;
        }
        // console.log('this.fid' + this.fid)

        return ft;
    },
    isSign() {

        let ft = false;

        if(this.email){

            ft = true;
        }
        // console.log('this.fid' + this.fid)

        return ft;
    }
})
