import Vue from 'vue'
import App from './App.vue'
import { Card,Modal,message,FormModel ,DatePicker,Result,Checkbox, Dropdown, Icon, Input, InputNumber, Radio, Select, Upload, Avatar, List, Button, Tooltip, Progress ,Col,Row,} from 'ant-design-vue';

const components = [DatePicker,Modal,Result,Checkbox,Card, FormModel , Dropdown, Icon, Input, InputNumber, Radio, Select, Upload, Avatar, List, Button, Tooltip, Progress,Col,Row,];

Vue.prototype.$message = message;

components.map(component => {
  Vue.use(component);
});

import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
