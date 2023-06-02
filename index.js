// 获取输入框的值
const searchquestion = document.getElementById('q');
// 获取搜索按钮
const searchbtns = document.getElementsByTagName("button")[0];
// 获取选中的搜索引擎
const selectengine = document.getElementsByTagName('select')[0];
// 搜索
searchquestion.addEventListener("keypress", function(event){
  if(event.key === "Enter"){
    search();
  } 
});
// 为搜索按钮添加点击事件，此处用search而不用search()，不然会直接执行search()
searchbtns.addEventListener('click', search);
function search(){
  window.open(selectengine.value + searchquestion.value, "_self");
}

// 获取websites.txt文件的数据
function get_web_list(){
  // 开始获取数据
  console.log("开始获取数据...");
  let website_list = [];
  // fetch 返回的是promise对象
  fetch('https://raw.githubusercontent.com/Unsaies/Unsaies.github.io/main/websites.txt')
    .then(response => response.text())
    .then(data => {
      // 文本处理:  \n  为切割行
      website_list = data.split('\n').map(line => {
        // 空格分隔
        let [name, url] = line.split(' ');
        return { name, url };
      });
      // 请求成功后运行
      show_website(website_list);
    })
    .catch((meg)=>{
      console.error(meg);
      console.log("数据请求失败，请刷新页面。");
      // get_web_list();
    });
}
get_web_list();

// 数据展示
function show_website(websdata) {
  const used_web = document.getElementsByClassName("used-websites")[0];
  for(let item = 0 ; item < websdata.length ; item++) {
    console.log(websdata[item]);
    // 创建a标签
    const alink = document.createElement("a");
    alink.textContent = websdata[item].name;
    alink.href = websdata[item].url;
    alink.target = "_blank";
    // 将a标签添加到容器
    used_web.appendChild(alink);
  }
}

