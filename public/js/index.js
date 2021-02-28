layui.use(["element", "laypage"], () => {
  let element = layui.element
  let laypage = layui.laypage
  const $ = layui.$
  
  element.tabDelete('demo', 'xxx')
  console.log(parseInt($("#laypage").data("maxnum")));
  console.log(parseInt($("#laypage").data("limit")));
  laypage.render({
    elem: "laypage",
    count: parseInt($("#laypage").data("maxnum")),
    limit: parseInt($("#laypage").data("limit")),
    groups:2, //底部1234导航,超过2的显示...
    curr: location.pathname.replace("/page/", ""),
    jump(obj, f){
      $("#laypage a").each((i, v) => {
       
        let pageValue = `/page/${$(v).data("page")}`
        v.href = pageValue
      })
    }
  })
})
