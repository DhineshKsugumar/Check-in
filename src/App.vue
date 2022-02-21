<template>
  <div>
         <div v-if="currentscreen === -1">
      <div class="Main_Container">
        <a-row
          type="flex"
          justify="center"
          align="middle"
          style="height: calc(100vh - 100px)"
        >
          <a-col :xs="{ span: 24 }" :md="{ span: 24 }">
            <div>
              <div class="c-card" style="width: 300px; margin: auto">
                <div class="c-card-img-logo" style="background: none">
                  <img
                    height="180px"
                    slot="cover"
                    alt="example"
                    src="./assets/logo.png"
                  />
                </div>
                <div class="c-card-body shadow" @click="book">
                  Check In
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <a-card class="progress_card" v-if="currentscreen > -1">
      <div>
        <h3>{{ formandscreen[currentscreen] }}</h3>
        <a-tooltip >
          <a-progress :percent="currentscreen * 20" />
        </a-tooltip>
      </div>
    </a-card>
    <a-card class="progress_card1">
      <div v-if="currentscreen === 0">
        <div>
          <a-input-search
            placeholder="Search Customer"
            size="large"
            @change="onSearch"
          />
        </div>
        <br />
        <div>
          <a-list :data-source="data">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta :description="item.Email">
                <a slot="title">{{ item.Customer_Name.display_value }}</a>
                <a-avatar
                  slot="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </a-list-item-meta>
              <div style="width: 100%; text-align: right">
                <br />
                <a-button type="primary" @click="selectnext(item)">
                  Select Customer</a-button
                >
              </div>
            </a-list-item>
          </a-list>
        </div>
      </div>
      <div v-if="currentscreen === 1">
        <div>
          <a-form-model
            ref="ruleForm"
            :model="fromdata"
            :rules="rules"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-form-model-item label="Name">
              <a-input disabled v-model="fromdata.Name.display_value" />
            </a-form-model-item>
            <a-form-model-item label="Email">
              <a-input disabled v-model="fromdata.Email" />
            </a-form-model-item>
            <a-form-model-item disabled label="Phone">
              <a-input disabled v-model="fromdata.Phone_Number" />
            </a-form-model-item>
            <a-form-model-item label="DOB">
              <a-date-picker disabled v-model="fromdata.Date_of_Birth"  format="MM/D/yyyy" />
            </a-form-model-item>
            <a-form-model-item label="Photo ID">
              <a-upload
                :file-list="fileList"
                :beforeUpload="filehandleChange"
                :loading="uploading"
                @change="handleChange"
                name="file"
              >
                <a-button>
                  <a-icon type="camera" theme="filled" /> Upload
                </a-button>
              </a-upload>
            </a-form-model-item>
            <a-form-model-item label="Address" prop="Address_M">
              <a-textarea
                v-model="fromdata.Address_M"
                placeholder="Address"
                :rows="4"
              />
            </a-form-model-item>
            <a-form-model-item label="Under 18">
              <a-checkbox disabled v-model="fromdata.Under_18"> </a-checkbox>
            </a-form-model-item>
            <a-form-model-item
              label="Emergency Contact Name"
              prop="Emergency_Contact_Name"
            >
              <a-input v-model="fromdata.Emergency_Contact_Name.first_name" />
            </a-form-model-item>
            <a-form-model-item
              required
              label="Emergency Contact Phone"
              prop="Emergency_Contact_Phone"
            >
              <a-input v-model="fromdata.Emergency_Contact_Phone" />
            </a-form-model-item>
            <div style="text-align: center">
              <a-button-group>
                <a-button type="primary" @click="back">
                  <a-icon type="left" />Go back
                </a-button>
                <a-button type="primary" @click="onSubmit">
                  Next <a-icon type="right" />
                </a-button>
              </a-button-group>
            </div>
          </a-form-model>
        </div>
      </div>
      <div v-if="currentscreen === 2">
        <a-form-model
          ref="ruleForm1"
          :model="fromdata"
          :rules="rules1"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <div>
            <h3>COVID-19 Liability Release Waiver</h3>
            <p>
              The World Health Organization has declared the novel Coronavirus
              (COVID-19) a worldwide pandemic. Due to its capacity to transmit
              from person to person through respiratory droplets, the government
              has set recommendations, guidelines, and some prohibitions to
              which San Diego Tattoo Shop Company, LLC. adheres to comply.<br /><br />
              By continuing, I acknowledge that I have read the foregoing
              Liability Release Waiver and understand its contents; that I am at
              least eighteen (18) years old and fully competent to give my
              consent; that I have been sufficiently informed of the risks
              involved and give my voluntary consent in signing it as my own
              free act and deed; that I give my voluntary consent in signing
              this Liability Release Waiver as my own free act and deed with
              full intention to be bound by the same, and free from any
              inducement or representation.<br /><br />
              This waiver will remain effective until laws and mandates relevant
              to COVID-19 are lifted.
            </p>
          </div>
          <div>
            <a-form-model-item label="" prop="covid_19_waiver_acceptance">
              <a-checkbox
                required
                v-model="fromdata.covid_19_waiver_acceptance"
              >
                I accept the Terms and Conditions<span style="color: red">
                  *</span
                >.
              </a-checkbox>
            </a-form-model-item>
          </div>

          <br />
          <a-form-model-item>
            <div style="text-align: center">
              <a-button-group>
                <a-button type="primary" @click="back">
                  <a-icon type="left" />Go back
                </a-button>
                <a-button type="primary" @click="onSubmit">
                  Next<a-icon type="right" />
                </a-button>
              </a-button-group>
            </div>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div v-if="currentscreen === 3">
        <a-form-model :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" ref="ruleForm3"
          :model="fromdata"
          :rules="rules3">
          <a-form-model-item label="Known Diseases?" prop="Known_Diseases">
            <a-radio-group v-model="fromdata.Known_Diseases">
              <a-radio value="Yes"> Yes </a-radio>
              <a-radio value="No"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item
            v-if="fromdata.Known_Diseases === 'Yes'"
            label="Known Disease Types"
            prop="Known_Disease_Type"
          >
            <a-select mode="multiple" v-model="fromdata.Known_Disease_Type">
              <a-select-option v-for="iter in Known_Disease_Type" :key="iter">
                {{ iter }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item
            v-if="
              fromdata.Known_Diseases === 'Yes' &&
              fromdata.Known_Disease_Type.includes('Other')
            "
            prop="Other_Known_Disease"
            label="Please specify other known disease"
          >
            <a-input v-model="fromdata.Other_Known_Disease" />
          </a-form-model-item>
          <a-form-model-item
            v-if="fromdata.Known_Diseases === 'Yes'"
            label="Known Disease Summary"
            prop="Known_Disease_Summary"
          >
            <a-textarea v-model="fromdata.Known_Disease_Summary" :rows="4" />
          </a-form-model-item>
          <a-form-model-item label="Health Conditions?" prop="Health_Conditions">
            <a-radio-group v-model="fromdata.Health_Conditions">
              <a-radio value="Yes"> Yes </a-radio>
              <a-radio value="No"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item
            v-if="fromdata.Health_Conditions === 'Yes'"
            label="Health Condition Types"
            prop="Type_of_Health_Condition"
          >
            <a-select
              mode="multiple"
              v-model="fromdata.Type_of_Health_Condition"
            >
              <a-select-option v-for="iter in Health_Condition" :key="iter">
                {{ iter }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item
            v-if="
              fromdata.Health_Conditions === 'Yes' &&
              fromdata.Type_of_Health_Condition.includes('Other')
            "
            label="Please specify other health condition"
            prop="Other_Health_Condition"
          >
            <a-input v-model="fromdata.Other_Health_Condition" />
          </a-form-model-item>
          <a-form-model-item
            v-if="fromdata.Health_Conditions === 'Yes'"
            label="Health Condition Summary"
            prop="Health_Condition_Summary"
          >
            <a-textarea :rows="4" v-model="fromdata.Health_Condition_Summary" />
          </a-form-model-item>
          <a-form-model-item label="Allergies ?" prop="Has_Allergies">
            <a-radio-group v-model="fromdata.Has_Allergies">
              <a-radio value="Yes"> Yes </a-radio>
              <a-radio value="No"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item
            v-if="fromdata.Has_Allergies === 'Yes'"
            label="Type(s) of Allergies"
            prop="Allergy_Types"
          >
            <a-select mode="multiple" v-model="fromdata.Allergy_Types">
              <a-select-option v-for="iter in Type_of_Allergies" :key="iter">
                {{ iter }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item
            v-if="
              fromdata.Has_Allergies === 'Yes' &&
              fromdata.Allergy_Types.includes('Other')
            "
            prop="Other_Allergies"
            label="Please specify other allergy"
          >
            <a-input v-model="fromdata.Other_Allergies" />
          </a-form-model-item>
          <a-form-model-item
            v-if="fromdata.Has_Allergies === 'Yes'"
            label="Allergy Summary"
            prop="Allergy_Summary"
          >
            <a-textarea v-model="fromdata.Allergy_Summary" :rows="4" />
          </a-form-model-item>
          <a-form-model-item label="Nursing or Pregnant?" prop="Nursing_or_Pregnant">
            <a-radio-group v-model="fromdata.Nursing_or_Pregnant" >
              <a-radio value="Yes"> Yes </a-radio>
              <a-radio value="No"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item
            v-if="fromdata.Nursing_or_Pregnant === 'Yes'"
            label="If yes, explain"
            prop="Nursing_or_Pregnant_Explanation"
          >
            <a-textarea
              v-model="fromdata.Nursing_or_Pregnant_Explanation"
              :rows="4"
            />
          </a-form-model-item>
          <a-form-model-item
            v-if="fromdata.Nursing_or_Pregnant === 'Yes'"
            label="Nursing or Pregnant Summary"
            prop="Nursing_or_Pregnant_Summary"
          >
            <a-textarea
              v-model="fromdata.Nursing_or_Pregnant_Summary"
              :rows="4"
            />
          </a-form-model-item>
          <a-form-model-item
            label="Are you under the influence of medications, alcohol, or drugs?"
            prop="is_Under_the_Influence"
          >
            <a-radio-group v-model="fromdata.is_Under_the_Influence">
              <a-radio value="Yes"> Yes </a-radio>
              <a-radio value="No"> No </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item
            v-if="fromdata.is_Under_the_Influence === 'Yes'"
            label="Specify medications, alcohol, or drugs"
            prop="Explain_Under_the_Influence"
          >
            <a-input v-model="fromdata.Explain_Under_the_Influence" />
          </a-form-model-item>
          <a-form-model-item
            v-if="fromdata.is_Under_the_Influence === 'Yes'"
            label="Under the Influence Summary"
            prop="Under_the_Influence_Summary"
          >
            <a-textarea
              :rows="4"
              v-model="fromdata.Under_the_Influence_Summary"
            />
          </a-form-model-item>
          <a-form-model-item label="How long (in hrs) since your last meal?" prop="Time_Since_Your_Last_Meal_Hrs">
            <a-input-number
              placeholder="Hours"
              :min="1"
              :max="10"
              v-model="fromdata.Time_Since_Your_Last_Meal_Hrs"
            />
          </a-form-model-item>
        </a-form-model>
        <div style="text-align: enter">
          <a-button-group>
            <a-button type="primary" @click="back">
              <a-icon type="left" />Go back
            </a-button>
            <a-button type="primary" @click="next">
              Next<a-icon type="right" />
            </a-button>
          </a-button-group>
        </div>
      </div>
      <div v-if="currentscreen === 4">
        <a-form-model
          ref="ruleForm2"
          :model="fromdata"
          :rules="rules1"
        >
          <a-form-model-item prop="Accept_All">
            <a-checkbox v-model="fromdata.Accept_All">
              I accept the Terms and Conditions.
            </a-checkbox> 
          </a-form-model-item>

          <div id="Sign" class="signclass">
            <VPerfectSignature
              height="150px"
              :customStyle="{ border: 'black 3px solid' }"
              ref="signaturePad"
              backgroundColor="#fff"
            />
          </div>
          <br>
        <a-form-model-item label="Date Accepted">
            <a-date-picker disabled v-model="fromdata.Legal_Ack_Acceptance_Date"  format="MM/D/yyyy"/>
        </a-form-model-item>
        <div style="text-align: center">
          <a-button-group>
            <a-button type="primary" @click="back">
              <a-icon type="left" />Go back
            </a-button>
            <a-button type="primary" @click="onSubmit">
              Done <a-icon type="right" />
            </a-button>
          </a-button-group>
        </div>
        </a-form-model>
        
      </div>
      <div v-if="currentscreen === 5">
        <a-result title="Check In Process Completed">
          <template #icon>
            <a-icon type="smile" theme="twoTone" />
          </template>
          <template #extra> </template>
        </a-result>
      </div>
      <br />
    </a-card>
  </div>
</template>
<script type="text/javascript" src="https://js.zohostatic.com/creator/widgets/version/1.0/widgetsdk-min.js"></script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Six+Caps&display=swap");
</style>
<script>
import VPerfectSignature from "v-perfect-signature";
import moment from "moment";

var Mainobject = this;
export default {
  components: {
    VPerfectSignature,
  },
  data() {
    return {
      strokeOptions: {
        width: "500px",
        height: "200px",
      },
      fileList: [],
      Type_of_Allergies: [
        "Antibiotics",
        "Metals",
        "Soaps",
        "Latex",
        "Alcohol",
        "Cosmetics",
        "Adhesives",
        "Petroleum",
        "Lidocaine",
        "Lanolin Oil",
        "Other",
      ],
      Health_Condition: [
        "Heart Disease",
        "High Blood Pressure",
        "Eczema",
        "Diabetes",
        "Epilepsy",
        "Hemophilia",
        "Infection",
        "Other",
      ],
      Known_Disease_Types: [
        "Hepatitis",
        "Tuberculosis",
        "Gonorrhea",
        "Syphilis",
        "HIV/AIDS",
        "Herpes",
        "Staph",
        "Asthma",
        "Skin Disease",
        "Other",
      ],
      formandscreen: [
        "Select Customer",
        "Client Details",
        "COVID-19 Waiver",
        "Medical History",
        "Legal Acknowledgement",
        "Completed",
      ],
      form: {
        name: "Test",
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        Address_M: [
          { required: true, message: "Please input Adress", trigger: "blur" },
        ],
        Emergency_Contact_Name: [
          { required: true, message: "Please input Name ", trigger: "blur" },
        ],
        Emergency_Contact_Phone: [
          {
            required: true,
            message: "Please input Contact Phone",
            trigger: "blur",
          },
        ],
        fileList: [
          { required: true, message: "Please prove the file", trigger: "blur" },
        ],
      },
      rules1: {
        covid_19_waiver_acceptance: [
          {
            required: true,
            message: "Please accept the term",
            trigger: "blur",
          },
        ],
      },
      rules2: {
        Accept_All: [
          {
            required: true,
            message: "Please accept the term",
            trigger: "change",
          },
        ],
      },
      rules3: {
        Known_Disease_Type:[],
        Known_Diseases: [
          {
            required: true,
            message: "Please choose Known Diseases",
            trigger: "change",
          },
        ],
        Health_Conditions: [
          {
            required: true,
            message: "Please choose Health Conditions",
            trigger: "change",
          },
        ],
        Nursing_or_Pregnant: [
          {
            required: true,
            message: "Please choose Nursing or Pregnant",
            trigger: "change",
          },
        ],
        Has_Allergies: [
          {
            required: true,
            message: "Please choose Has Allergies",
            trigger: "change",
          },
        ],
        is_Under_the_Influence: [
          {
            required: true,
            message: "Please choose is Under the Influence",
            trigger: "change",
          },
        ],
        Time_Since_Your_Last_Meal_Hrs: [
          {
            required: true,
            message: "Please Enter Last meal",
            trigger: "change",
          },
        ]
      },
      data: [],
      currentscreen: -1,
      loading: false,
      busy: false,
      selectedCustomer: {},
      Creator_ID: "",
      File_Photo_ID: [],
      uploading: false,
      File_Signature_Legal_Ack: null,
      fromdata: {
        Name: undefined,
        Phone_Number: undefined,
        Email: undefined,
        Date_of_Birth: undefined,
        Address_M: undefined,
        Under_18: undefined,
        Emergency_Contact_Name: { first_name: "" },
        Emergency_Contact_Phone: null,
        covid_19_waiver_acceptance: null,
        Known_Diseases: null,
        Known_Disease_Type: [],
        Other_Known_Disease: null,
        Known_Disease_Summary: null,
        Health_Conditions: null,
        Type_of_Health_Condition: [],
        Other_Health_Condition: null,
        Health_Condition_Summary: null,
        Has_Allergies: null,
        Allergy_Types: [],
        Other_Allergies: null,
        Allergy_Summary: null,
        Nursing_or_Pregnant: null,
        Nursing_or_Pregnant_Explanation: null,
        Nursing_or_Pregnant_Summary: null,
        is_Under_the_Influence: null,
        Explain_Under_the_Influence: null,
        Under_the_Influence_Summary: null,
        Time_Since_Your_Last_Meal_Hrs: null,
        Accept_All: null,
        Legal_Ack_Acceptance_Date: moment(),
      },
    };
  },
  mounted() {
    ZOHO.CREATOR.init().then(function (data) {});
  },
  watch: {
    // whenever question changes, this function will run
    'fromdata.Known_Diseases'(newValue) {
     console.log("Test");
     if(this.fromdata.Known_Diseases == "Yes")
     {
       
     this.rules3 = Object.assign({}, this.rules3, {[{
            required: true,
            message: "Please accept the term",
            trigger: "change",
          },
        ]});
     
    }
  },
  methods: {
    getAge(birthDate) 
    {
        var today = new Date();
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        return age;
    },
    selectnext(e) {
      this.selectedCustomer = e;
      console.log(this.selectedCustomer.Date_of_Birth);
      console.log(moment(this.selectedCustomer.Date_of_Birth, "DD-MMM-YYYY"));
      this.fromdata.Phone_Number = this.selectedCustomer.Contact_Number;
      this.fromdata.Email = this.selectedCustomer.Email;
      this.fromdata.Name = this.selectedCustomer.Customer_Name;
      this.fromdata.Date_of_Birth = moment(
        this.selectedCustomer.Date_of_Birth,
        "DD-MMM-YYYY"
      );
      
      if(this.getAge(this.fromdata.Date_of_Birth.toDate())<18)
      {
         this.fromdata.Under_18 == true;
      }
      this.currentscreen++;
    },
    tofileobject() {
      // var dataurl = targetDiv.toDataURL();
      // var blob = dataURLtoBlob(dataurl);
      // blob.name = "imageFilename.png"
      // console.log(blob);
      //return blob;
    },
    book()
    {
        this.currentscreen++;
    },
    filehandleChange(file) {
      this.File_Photo_ID = file;
      this.fileList = [...this.fileList, file];
      console.log(file);
      return false;
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
      this.File_Photo_ID = null;
    },
    handleChange(info) {
      const status = info.file.status;
      console.log(info.file.status);
      if (status !== "uploading") {
        // show update progress console.log(info.file, info.fileList);
      }
      if (status === "done") {
        // show success message
      } else if (status === "error") {
        // show error message
      }
    },
    done() {
      console.log("doen")
      var varStage = this;
      if (!varStage.Creator_ID) {
        console.log("no record");
        var AddRecord = {
          data: varStage.FormatObject(),
        };
        // console.log(AddRecord)
        var config3 = {
          appName: "sdtattoo",
          formName: "Customer_Check_In",
          data: AddRecord,
        };
        ZOHO.CREATOR.API.addRecord(config3).then(function (response) {
          var targetDiv = document
            .getElementById("Sign")
            .getElementsByTagName("canvas")[0];
          targetDiv.toBlob(function (blob) {
            blob.name = "Sign.png";
            var config2 = {
              appName: "sdtattoo",
              reportName: "Widget_Check_Ins",
              id: response.data.ID,
              fieldName: "Sign",
              file: blob,
            };
            console.log(config2);
            ZOHO.CREATOR.API.uploadFile(config2).then(function (response) {
              console.log("Sign uploaded successfully");
            });
          });

          if (varStage.File_Photo_ID) {
            var config = {
              appName: "sdtattoo",
              reportName: "Widget_Check_Ins",
              id: response.data.ID,
              fieldName: "Photo_ID",
              file: varStage.File_Photo_ID,
            };
            console.log(config);
            ZOHO.CREATOR.API.uploadFile(config).then(function (response) {
              console.log("Photo ID uploaded successfully");
              varStage.currentscreen++;
            });
          }
        })
       
      }
    },
    onSubmit() {
      if (this.currentscreen == 1) {
        this.$refs.ruleForm.validate((valid) => {
          console.log(valid);
          if (valid) {
            if(this.fileList.length > 0)
            {
            this.currentscreen++;
            }
            else
            {
              this.$message.error('Please provide a copy your photo ID (e.g. Drivers license)');
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else if (this.currentscreen == 2) {
        this.$refs.ruleForm1.validate((valid) => {
          console.log(valid);
          if (valid) {
            this.currentscreen++;
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
      else if (this.currentscreen == 4) {
        if(this.fromdata.Accept_All == true)
        {
           this.done()
          } else {
             this.$message.error('Accept the condition');
          }
       
      }
    },
    next()
    {
      this.$refs.ruleForm3.validate((valid) => {
          console.log(valid);
          if (valid) {
            this.currentscreen++;
          } else {
            console.log("error submit!!");
            return false;
          }
        });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    FormatObject() {
      let NewObj = Object.assign({}, this.fromdata);
      console.log(typeof NewObj.Date_of_Birth);
      console.log(NewObj.Date_of_Birth);
      if (NewObj.Date_of_Birth) {
        NewObj.Date_of_Birth = this.timeFormate(NewObj.Date_of_Birth.toDate());
      }
      if (NewObj.Legal_Ack_Acceptance_Date) {
        NewObj.Legal_Ack_Acceptance_Date = this.timeFormate(
          NewObj.Legal_Ack_Acceptance_Date.toDate()
        );
      }
      return JSON.parse(JSON.stringify(NewObj));
    },
    timeFormate(date) {
      var mS = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      var year_s = date.getFullYear();
      var Month_s = date.getMonth();
      var Date_S = date.getDate();
      var strTime = Date_S + "-" + mS[Month_s] + "-" + year_s;
      console.log(strTime);
      return strTime;
    },
    back() {
      this.currentscreen--;
    },
    onSearch(e) {
      const { value } = e.target;
      console.log(value);
      var varStage = this;
      var cra ='Email.contains("' +value +'") || Customer_Name.contains("' +value +'")';
      //console.log(cra);
      var configB = {
        appName: "sdtattoo",
        reportName: "Widget_Appointments_for_search",
        criteria: cra,
      };
      ZOHO.CREATOR.API.getAllRecords(configB).then(function (response) {
        console.log(response);
        varStage.data = response.data;
      });
    },
  },
};
</script>
<style >
.progress_card {
  background: #202020 !important;
}
.signclass {
  border: rgb(75, 75, 75) 1px solid;
  max-width: 400px;
}
.ant-card-body h3 , .ant-progress-text
{
  color: #fff !important;
}
.Main_Container {
  min-height: 100vh;
  background-image: url(https://www.sandiegotattooshop.com/wp-content/themes/sdtattoomob2016/images/headerbg-main.jpg);
}

.artistname {
  background: #548302 !important;
  color: white;
}

.ant-btn-primary {
  background: #548302 !important;
  color: white;
}
.artistname:hover {
  box-shadow: 5px 11px 47px 0px rgba(255, 255, 255, 0.75) !important;
  -webkit-box-shadow: 5px 11px 47px 0px rgba(255, 255, 255, 0.75) !important;
  -moz-box-shadow: 5px 11px 47px 0px rgba(255, 255, 255, 0.75) !important;
}
.spincus
{
  position: fixed !important;
  width: 100vw !important;
    height: 100vh !important;
    padding-top: 50%;
    background: #d1d1d1b8 !important;
    z-index: 4;
}

.listdata {
  width: 90%;
  padding: 20px !important;
  margin-top: 50px !important;
  text-align: -webkit-center !important;
}
.Main_Container .ant-card-cover {
  border: unset !important;
}

.ant-card-meta-title {
  color: #fff !important;
}
.c-card {
  /* flex-direction: column;
  display: flex; */
  color: white;
}
.c-card-body {
  font-size: 42px;
  font-family: "Six Caps", sans-serif;
  color: #fff;
  background: #548302;
  padding: 8px;
  text-align: center;
}
.c-card-skip {
  font-size: 28px;
  font-family: "Six Caps", sans-serif;
  color: #fff;
  background: #548302;
  padding: 2px;
  text-align: center;
}
btnc {
  font-family: "Six Caps", sans-serif;
  color: #fff;
  background: #548302;
  height: auto !important;
  font-size: 30px !important;
  padding: 0px 30px !important;
}

.tilehead {
  font-size: 42px;
  font-family: "Six Caps", sans-serif;
  color: #fff;
  padding: 8px;
  text-align: left;
}

.shadow:hover {
  box-shadow: 5px 11px 47px 0px rgba(255, 255, 255, 0.75);
  -webkit-box-shadow: 5px 11px 47px 0px rgba(255, 255, 255, 0.75);
  -moz-box-shadow: 5px 11px 47px 0px rgba(255, 255, 255, 0.75);
}
.c-card-img-logo {
  padding: 20px;
  text-align: center;
  border: unset !important;
}
.c-card-img {
  padding: 20px;
  border: unset !important;
  border: unset !important;
  background: #1c1c1b !important;
}

.signclass {
  border: black 1px solid;
  max-width: 400px;
}
.Main_Container {
  background-image: url(https://www.sandiegotattooshop.com/wp-content/themes/sdtattoomob2016/images/headerbg-main.jpg) !important;
}
</style>