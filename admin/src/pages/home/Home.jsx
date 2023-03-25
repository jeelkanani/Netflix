import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function Home() {
  const MONTHS=useMemo(()=>["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"],[])
  const [userstate, setUserstate] = useState([]);
  

  useEffect(()=>{
    const getStats = async ()=>{
      try {
        const res= await axios.get("/user/stats",
        {
          headers:
          {
            "auth-token":JSON.parse(localStorage.getItem("user")).accessToken,
          }
        }
        )
        // console.log(res.data);
        // setUserstate(res.data);
        // console.log(userstate);
        const statsList=res.data.sort(function(a,b){
          return a._id-b._id;
        })
        statsList.map((item)=>
        setUserstate((prev)=>[
          ...prev,
          {name:[MONTHS[item._id-1]],"New User":item.total},
        ])
      );
      } 
      catch (error) 
      {
        console.log(error);
      }
    }
    getStats();
  },[MONTHS])


 

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userstate} title="User Analytics" grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
