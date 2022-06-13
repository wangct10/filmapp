// 封装混入
var obj = {
  created() {
    // console.log("创建完成");
    this.$store.commit("hide");
  },
  destroyed() {
    this.$store.commit("show");
  },
  methods: {
    a() {
      console.log("aaa");
    },
  },
};

export default obj