import { useState, useEffect, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import styles from "../styles/JobCard.module.css";

import logo from "../assets/logo.png";
import bikeLeft from "../assets/bike_left.png";
import bikeRight from "../assets/bike_right.png";
import termsImg from "../assets/terms_conditions.jpeg"; 
export default function JobCard() {
  const pageRef = useRef(null);

  /* ================= STATE ================= */
  const [inspection, setInspection] = useState(() =>
    JSON.parse(localStorage.getItem("jobcard_inspection")) || {}
  );

  // const [header, setHeader] = useState(() =>
  //   JSON.parse(localStorage.getItem("jobcard_header")) || {
  //     quotation: "",
  //     sales: "",
  //     invoice: "",
  //     vin: ""
  //   }
  // );
  const [header, setHeader] = useState(() => {
  const saved = JSON.parse(localStorage.getItem("jobcard_header")) || {};
  return {
    quotation: saved.quotation?.toString() || "",
    sales: saved.sales?.toString() || "",
    invoice: saved.invoice?.toString() || "",
    vin: saved.vin?.toString() || "",
  };
});


  const [requests, setRequests] = useState(() =>
    JSON.parse(localStorage.getItem("jobcard_requests")) || {
      requested: Array(11).fill(""),
      remarks: Array(11).fill("")
    }
  );

const [qc, setQc] = useState(() =>
  JSON.parse(localStorage.getItem("jobcard_qc")) || {
    startKm: ["", "", ""],
    endKm: ["", "", ""],
    remarks: ["", "", ""]
  }
);

// const [customer, setCustomer] = useState(() =>
//   JSON.parse(localStorage.getItem("jobcard_customer")) || {
//     name: "",
//     date: "",
//     satisfaction: ""
//   }
// );
const [customer, setCustomer] = useState(() =>
  JSON.parse(localStorage.getItem("jobcard_customer")) || {
    name: "",
    email: "",
    garageUser: "",
    date: "",
    satisfaction: "",
    timeIn: "",
    timeOut: ""
  }
);

const [customer, setCustomer] = useState(() =>
  JSON.parse(localStorage.getItem("jobcard_customer")) || {
    name: "",
    date: "",
    satisfaction: ""
  }
);


  const [receiveDeliver, setReceiveDeliver] = useState(() =>
    JSON.parse(localStorage.getItem("jobcard_receiveDeliver")) || {
      receiveDate: "",
      receiveTime: "",
      deliverDate: "",
      deliverTime: ""
    }
  );

  const [signature, setSignature] = useState(
    localStorage.getItem("jobcard_signature")
  );

  const [signOpen, setSignOpen] = useState(false);
  const sigRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
 

  /* ================= TIME IN AUTO ================= */
  useEffect(() => {
    setReceiveDeliver(prev => ({
      ...prev,
      receiveTime: prev.receiveTime || new Date().toLocaleTimeString()
    }));
  }, []);

  const resetForm = () => {
  setHeader({ quotation: "", sales: "", invoice: "", vin: "" });
  setInspection({});
  setRequests({ requested: Array(11).fill(""), remarks: Array(11).fill("") });
  setQc({ startKm: ["", "", ""], endKm: ["", "", ""], remarks: ["", "", ""] });
setCustomer({
  name: "",
  email: "",
  garageUser: "",
  date: "",
  satisfaction: "",
  timeIn: "",
  timeOut: ""
});
  setReceiveDeliver({ receiveDate: "", receiveTime: "", deliverDate: "", deliverTime: "" });
  setSignature(null);
  localStorage.removeItem("jobcard_signature"); // FIX

  setCustomer({ name: "", date: "", satisfaction: "" });
  setReceiveDeliver({ receiveDate: "", receiveTime: "", deliverDate: "", deliverTime: "" });
  setSignature(null);
  setErrors({});
};

const [agree, setAgree] = useState(false);

  /* ================= LOCAL STORAGE PERSISTENCE ================= */
useEffect(() => {
  localStorage.setItem("jobcard_header", JSON.stringify(header));
}, [header]);

useEffect(() => {
  localStorage.setItem("jobcard_inspection", JSON.stringify(inspection));
}, [inspection]);

useEffect(() => {
  localStorage.setItem("jobcard_requests", JSON.stringify(requests));
}, [requests]);

useEffect(() => {
  localStorage.setItem("jobcard_receiveDeliver", JSON.stringify(receiveDeliver));
}, [receiveDeliver]);

useEffect(() => {
  localStorage.setItem("jobcard_qc", JSON.stringify(qc));
}, [qc]); // <-- QC now persistent

useEffect(() => {
  localStorage.setItem("jobcard_customer", JSON.stringify(customer));
}, [customer]); // <-- Customer info persistent

useEffect(() => {
  if (signature) localStorage.setItem("jobcard_signature", signature);
}, [signature]);


  /* ================= VALIDATION ================= */
  const requiredFields = {
    "header.quotation": header.quotation,
    "header.sales": header.sales,
    "header.invoice": header.invoice,
    "header.vin": header.vin,
    "customer.name": customer.name,
    "customer.date": customer.date,
    "receiveDeliver.receiveDate": receiveDeliver.receiveDate,
    "receiveDeliver.receiveTime": receiveDeliver.receiveTime,
    "receiveDeliver.deliverDate": receiveDeliver.deliverDate,
    "receiveDeliver.deliverTime": receiveDeliver.deliverTime,
    "customer.email": customer.email,
    "customer.garageUser": customer.garageUser,
    "receiveDeliver.deliverTime": receiveDeliver.deliverTime
>>>>>>> 9def5513a580d8d84c913e5946614c04a42da01b
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(requiredFields).forEach(([key, value]) => {
      if (!value || value.trim() === "") newErrors[key] = true;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstKey = Object.keys(newErrors)[0];
      const el = document.querySelector(`[data-field='${firstKey}']`);
      el?.focus();
      alert("Please fill all required fields.");
      return false;
    }
    return true;
  };

  const select = (key, val) => setInspection(prev => ({ ...prev, [key]: val }));


  /* ================= ACTIONS ================= */
  const handleDraft = async () => {
<<<<<<< HEAD
  try {
    const payload = {
      quotation: header.quotation || "",
      sales: header.sales || "",
      invoice: header.invoice || "",
      vin: header.vin || "",
      inspection,
      requests,
      qc,
      customer,
      receive_deliver: receiveDeliver,
      signature: signature || "",
      status: "draft"
    };

=======
  const payload = {
    quotation: header.quotation?.toString() || "",
    sales: header.sales?.toString() || "",
    invoice: header.invoice?.toString() || "",
    vin: header.vin?.toString() || "",
    inspection,
    requests,
    qc,
    customer,
    receive_deliver: receiveDeliver,
    status: "draft",
  };

  try {
>>>>>>> 9def5513a580d8d84c913e5946614c04a42da01b
    const res = await fetch("http://localhost:8000/api/jobcards/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

<<<<<<< HEAD
    const text = await res.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Non JSON Response:", text);
      alert("Server returned invalid response.");
      return;
    }

    if (res.ok) {
      alert("Draft saved successfully!");
      resetForm();
    } else {
      console.error(data);
      alert("Draft save failed.");
    }
  } catch (err) {
    console.error(err);
    alert("Server error.");
=======
    if(res.ok){
      alert("Draft saved successfully!");
      resetForm();
    } else {
      const err = await res.json();
      console.log("Error response:", err);
      alert("Failed to save draft.");
    }
  } catch(err) {
    console.error(err);
    alert("Failed to save draft.");
>>>>>>> 9def5513a580d8d84c913e5946614c04a42da01b
  }
};


  const handleSubmit = async () => {
<<<<<<< HEAD

  if (!validateForm()) return;

  const now = new Date().toLocaleTimeString();

  try {

    // ================= GENERATE PDF =================
    const canvas = await html2canvas(pageRef.current, {
      scale: 1,
      useCORS: true,
      scrollY: -window.scrollY
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.7);

    const pdf = new jsPDF({
  orientation: "p",
  unit: "mm",
  format: "a4",
  compress: true
});

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pageHeight =
      pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;

    const imgHeight =
      (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;

    let position = 0;

    // first page
    pdf.addImage(
      imgData,
      "PNG",
      0,
      position,
      imgWidth,
      imgHeight
    );

    heightLeft -= pageHeight;

    // extra pages
    while (heightLeft > 0) {

      position = heightLeft - imgHeight;

      pdf.addPage();

      pdf.addImage(
        imgData,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= pageHeight;
    }

    // blob
    const pdfBlob = pdf.output("blob");

    // ================= FORMDATA =================
    const formData = new FormData();

    formData.append("quotation", header.quotation || "");
    formData.append("sales", header.sales || "");
    formData.append("invoice", header.invoice || "");
    formData.append("vin", header.vin || "");

    formData.append(
      "inspection",
      JSON.stringify(inspection)
    );

    formData.append(
      "requests",
      JSON.stringify(requests)
    );

    formData.append(
      "qc",
      JSON.stringify(qc)
    );

    formData.append(
      "customer",
      JSON.stringify(customer)
    );

    formData.append(
      "receive_deliver",
      JSON.stringify({
        ...receiveDeliver,
        deliverTime: now
      })
    );

    formData.append(
      "signature",
      signature || ""
    );

    formData.append(
      "status",
      "submitted"
    );

    // PDF attach
    formData.append(
      "pdf",
      pdfBlob,
      "jobcard.pdf"
    );

    // ================= API =================
    const res = await fetch(
      "http://localhost:8000/api/jobcards/",
      {
        method: "POST",
        body: formData
      }
    );

    const text = await res.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      console.error(text);
      alert("Invalid server response");
      return;
    }

    if (res.ok) {

      setSubmitted(true);

      alert(
        "Job Card Submitted Successfully!"
      );

      resetForm();

    } else {

      console.error(data);

      alert("Submit failed");
    }

  } catch (err) {

    console.error(err);

    alert("Server error");
  }
};

  /* ================= RENDER ================= */
  return (
<div className={styles.page} ref={pageRef}>
=======
  if (!validateForm()) return;

  const payload = new FormData();

payload.append("quotation", header.quotation?.toString() || "");
payload.append("sales", header.sales?.toString() || "");
payload.append("invoice", header.invoice?.toString() || "");
payload.append("vin", header.vin?.toString() || "");


payload.append("inspection", JSON.stringify(inspection));
payload.append("requests", JSON.stringify(requests));
payload.append("qc", JSON.stringify(qc));
payload.append("customer", JSON.stringify(customer));
payload.append("receive_deliver", JSON.stringify(receiveDeliver));

  if(signature) payload.append("signature", signature); // signature as base64 image

  try {
    const res = await fetch("http://localhost:8000/api/jobcards/", {
      method: "POST",
      body: payload
    });
    if(res.ok){
      setSubmitted(true);
      resetForm();
      alert("Job Card Submitted Successfully!");
    }
  } catch(err){
    console.error(err);
    alert("Failed to submit job card.");
  }
};


  /* ================= RENDER ================= */
  return (
    <div className={styles.page}>

>>>>>>> 9def5513a580d8d84c913e5946614c04a42da01b
      {/* ================= HEADER ================= */}
      <table className={styles.headerTable}>
        <tbody>
          <tr>
            <td className={styles.logoCell}><img src={logo} /></td>
            <td className={styles.infoCell}>
              <table className={styles.infoTable}>
                <tbody>
                  { ["quotation","sales","invoice","vin"].map((k,i) => (
                    <tr key={k}>
                      <td>{["Quotation No","Sales Order No","Invoice No","VIN No"][i]}:</td>
                      <td>
                        <input
                          data-field={`header.${k}`}
                          className={errors[`header.${k}`] ? styles.errorInput : ""}
                          value={header[k]}
                          onChange={e => setHeader({...header, [k]: e.target.value})}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ================= BIKE IMAGES ================= */}
      <table className={styles.bikes}>
        <tbody>
          <tr>
            <td><img src={bikeLeft} /></td>
            <td><img src={bikeRight} /></td>
          </tr>
        </tbody>
      </table>

      {/* ================= SECTIONS ================= */}
      {section("TIRES", "BRAKE SYSTEM",
        ["Front", "Rear", "Rear 2 Tri-Glide Only"],
        ["Front Pads","Rear Pads","Front Master Cylinder","Rear Master Cylinder","Parking Brake Adjust","Tri-Glide Only"]
      )}

      {section("WHEELS", "POWERTRAIN / CHASSIS",
        ["Wheel Condition","Spokes (If Applicable)","Front Master Cylinder","Heel Bearing"],
        ["Leaks / Weeps","Critical Fasteners","Sprocket / Pulley"]
      )}

      {section("COSMETIC", "CHARGING SYSTEM",
        ["Grips","Footrests","Light & Indicators","Saddle Bags","Sissy Bar","Paint Work"],
        ["Battery Voltage","Charging Output"]
      )}

      {section("FLUIDS", "MISCELLANEOUS",
        ["Engine","Primary","Transmission","Anti-Freeze","Front Master Cylinder","Rear Master Cylinder"],
        ["Clutch Operation","Air Filter","Lighting","Horn","Cables / Lines","Exhaust"]
      )}

      {/* ================= REQUEST / REMARKS ================= */}
<div className={styles.reqBlock}>
  {["requested", "remarks"].map((type) => (
    <div key={type} className={styles.reqBox}>
      <div className={styles.reqHead}>
        {type === "requested" ? "REQUESTED JOB" : "REMARKS"}
      </div>

      {requests[type].map((value, index) => (
        <div key={`${type}-${index}`} className={styles.reqRow}>
          <span className={styles.reqNo}>{index + 1}.</span>
          <input
            className={styles.reqInput}
            value={value}
            onChange={(e) => {
              const updated = [...requests[type]];
              updated[index] = e.target.value;
              setRequests({ ...requests, [type]: updated });
            }}
          />
        </div>
      ))}
    </div>
  ))}
</div>

      {/* ================= QUALITY CHECK ================= */}
      <div className={styles.qcHeaderRow}>QUALITY CHECK ROAD TEST</div>
      <div className={styles.reqBlock}>
        { ["START KM", "END KM", "REMARKS", "SIGNATURE"].map((label, colIdx) => (
          <div key={colIdx} className={styles.reqBox}>
            <div className={styles.reqHead}>{label}</div>
            {[0,1,2].map(rowIdx => (
              <div key={rowIdx} className={styles.reqRow}>
                { label !== "SIGNATURE" ? (
                  <input
                    className={styles.reqInput}
                    value={ label === "START KM" ? qc.startKm[rowIdx] : label === "END KM" ? qc.endKm[rowIdx] : qc.remarks[rowIdx] }
                    onChange={e => {
                      const value = e.target.value;
                      if(label === "START KM") { const arr = [...qc.startKm]; arr[rowIdx] = value; setQc({...qc,startKm: arr}); }
                      else if(label === "END KM") { const arr = [...qc.endKm]; arr[rowIdx] = value; setQc({...qc,endKm: arr}); }
                      else { const arr = [...qc.remarks]; arr[rowIdx] = value; setQc({...qc,remarks: arr}); }
                    }}
                  />
                ) : (
                  signature ? <img src={signature} className={styles.signImg} /> : <button onClick={()=>setSignOpen(true)}>Sign</button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

<<<<<<< HEAD
  {/* ================= CUSTOMER INFO ================= */}
<table className={styles.customerTable}>
  <tbody>

    {/* Customer Name */}
    <tr>
      <td>
        Customer Name:
        <input
          type="text"
          data-field="customer.name"
          className={errors["customer.name"] ? styles.errorInput : ""}
          value={customer.name}
          onChange={e =>
            setCustomer({ ...customer, name: e.target.value })
          }
        />
      </td>

      <td className={styles.arCell}>
        اسم العميل:
      </td>
    </tr>

    {/* User Email */}
    <tr>
      <td>
        User Email:
        <input
          type="email"
          data-field="customer.email"
          className={errors["customer.email"] ? styles.errorInput : ""}
          value={customer.email}
          onChange={e =>
            setCustomer({ ...customer, email: e.target.value })
          }
        />
      </td>

      <td className={styles.arCell}>
        البريد الإلكتروني:
      </td>
    </tr>

    {/* Garage User */}
  {/* Garage User */}
<tr>
  <td>
    Garage User Email:
    <input
      type="email"
      data-field="customer.garageUser"
      className={errors["customer.garageUser"] ? styles.errorInput : ""}
      value={customer.garageUser}
      onChange={e =>
        setCustomer({ ...customer, garageUser: e.target.value })
      }
    />
  </td>

  <td className={styles.arCell}>
    البريد الإلكتروني للكراج:
  </td>
</tr>

    {/* Signature */}
    <tr>
      <td>
        Customer Signature:

        <div className={styles.signatureBox}>
          {signature ? (
            <img src={signature} className={styles.signImg} />
          ) : (
            <button
              type="button"
              onClick={() => setSignOpen(true)}
              className={styles.signBtn}
            >
              Add Signature
            </button>
          )}
        </div>
      </td>

      <td className={styles.arCell}>
        توقيع العميل:
      </td>
    </tr>

    {/* Date */}
    <tr>
      <td className={styles.dateFieldCell}>
        <div className={styles.dateField}>
          <label>Date</label>

          <input
            type="date"
            data-field="customer.date"
            className={errors["customer.date"] ? styles.errorInput : ""}
            value={customer.date}
            onChange={e =>
              setCustomer({ ...customer, date: e.target.value })
            }
          />
        </div>
      </td>

      <td className={`${styles.arCell} ${styles.dateFieldAr}`}>
        <label>تاريخ</label>
      </td>
    </tr>

    <tr>
  <td>

    <div className={styles.satisfactionBlock}>
      <label>Has Received With Satisfaction:</label>

      <input
        type="text"
        data-field="customer.satisfaction"
        className={errors["customer.satisfaction"] ? styles.errorInput : ""}
        value={customer.satisfaction}
        onChange={e =>
          setCustomer({
            ...customer,
            satisfaction: e.target.value
          })
        }
      />
    </div>

    {/* TIME IN OUT separated properly */}
    <div className={styles.timeInOutRow}>

      <div className={styles.timeBox}>
        <label>Time In</label>
        <input
          type="time"
          value={customer.timeIn || ""}
          onChange={e =>
            setCustomer({
              ...customer,
              timeIn: e.target.value
            })
          }
        />
      </div>

      <div className={styles.timeBox}>
        <label>Time Out</label>
        <input
          type="time"
          value={customer.timeOut || ""}
          onChange={e =>
            setCustomer({
              ...customer,
              timeOut: e.target.value
            })
          }
        />
      </div>

    </div>

  </td>

  <td className={styles.arCell}>
    تم استلام الدراجة برضا تام:
  </td>
</tr>

  </tbody>
</table>
=======
      {/* ================= CUSTOMER INFO ================= */}
      <table className={styles.customerTable}>
        <tbody>
          <tr>
            <td>Customer Name:
              <input
                data-field="customer.name"
                className={errors["customer.name"] ? styles.errorInput : ""}
                value={customer.name}
                onChange={e => setCustomer({...customer,name:e.target.value})}
              />
            </td>
            <td className={styles.arCell}>اسم العميل:</td>
          </tr>
          <tr>
            <td>Customer Signature:
              { signature ? <img src={signature} className={styles.signImg} /> : <button onClick={()=>setSignOpen(true)}>Add Signature</button> }
            </td>
            <td className={styles.arCell}>توقيع العميل:</td>
          </tr>
          <tr>
            <td className={styles.dateFieldCell}>
              <div className={styles.dateField}>
                <label>Date</label>
                <input
                  type="date"
                  data-field="customer.date"
                  className={errors["customer.date"] ? styles.errorInput : ""}
                  value={customer.date}
                  onChange={e => setCustomer({...customer,date:e.target.value})}
                />
              </div>
            </td>
            <td className={`${styles.arCell} ${styles.dateFieldAr}`}><label>تاريخ</label></td>
          </tr>
          <tr>
            <td>Has Received With Satisfaction:
              <input
                data-field="customer.satisfaction"
                className={errors["customer.satisfaction"] ? styles.errorInput : ""}
                value={customer.satisfaction}
                onChange={e => setCustomer({...customer,satisfaction:e.target.value})}
              />
            </td>
            <td className={styles.arCell}>تم استلام الدراجة برضا تام:</td>
          </tr>
        </tbody>
      </table>
>>>>>>> 9def5513a580d8d84c913e5946614c04a42da01b

      {/* ================= RECEIVE / DELIVER ================= */}
      <div className={styles.timeRow}>
        {[ ["Receive Date","receiveDate","date"], ["Receive Time","receiveTime","time"], ["Deliver Date","deliverDate","date"], ["Deliver Time","deliverTime","time"] ].map(([label,key,type]) => (
          <div key={key} className={styles.timeField}>
            <label>{label}</label>
            <input
              type={type}
              data-field={`receiveDeliver.${key}`}
              className={errors[`receiveDeliver.${key}`] ? styles.errorInput : ""}
              value={receiveDeliver[key]}
              onChange={e => setReceiveDeliver({...receiveDeliver,[key]:e.target.value})}
            />
          </div>
        ))}
      </div>

      <div className={styles.bottomRed}></div>

{/* ================= TERMS & CONDITIONS IMAGE ================= */}
<div className={styles.termsImgWrapper}>
  <img src={termsImg} alt="Terms and Conditions" />

  <label className={styles.agreeRow}>
    <input
      type="checkbox"
      checked={agree}
      onChange={(e) => setAgree(e.target.checked)}
    />
    <span>
      I have read and agree to the Terms & Conditions <br />
      <span className={styles.ar}>أقر وأوافق على الشروط والأحكام</span>
    </span>
  </label>
</div>

      

      {/* ================= ACTION BUTTONS ================= */}
      <div className={styles.submitRow}>
        <button className={styles.draftBtn} onClick={handleDraft}>Save as Draft</button>
        <button className={styles.submitBtn} onClick={handleSubmit}>Submit</button>
      </div>

      {/* ================= SUCCESS POPUP ================= */}
      { submitted && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h3 style={{color:"#d80000"}}>✅ Submitted Successfully</h3>
            <p>Job Card has been submitted.</p>
            <button onClick={() => { 
  setSubmitted(false); 
  resetForm(); 
}}>OK</button>

          </div>
        </div>
      )}

      {/* ================= PRINT ================= */}
      <button className={styles.printBtn} onClick={()=>window.print()}>PRINT / PDF</button>

      {/* ================= SIGNATURE MODAL ================= */}
      { signOpen && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <SignatureCanvas
              ref={sigRef}
              penColor="black"
              canvasProps={{ className: styles.signPad }}
            />
            <div className={styles.modalBtns}>
              <button onClick={()=>sigRef.current.clear()}>Clear</button>
              <button onClick={() => { setSignature(sigRef.current.toDataURL()); setSignOpen(false); }}>Done</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );


  /* ================= HELPERS ================= */

  function box(label, idx) {
  const value = inspection[label];

  // Map value to color
  const colorMap = {
    excellent: "green",
    medium: "orange",
    bad: "red",
  };

  return (
    <div key={label} className={styles.gridRow}>
      <div className={styles.itemName}>{label}</div>
      {["excellent", "medium", "bad"].map(v => (
        <div
          key={`${label}-${v}`}
          className={styles.gridBox} // only base box style
          style={{
            borderColor: colorMap[v],
            color: colorMap[v],
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: "24px", // center vertically
            cursor: "pointer"
          }}
          onClick={() => select(label, v)}
        >
          {value === v ? "✔" : ""}
        </div>
      ))}
    </div>
  );
}


  function section(leftTitle, rightTitle, leftItems, rightItems) {
    return (
      <table className={styles.section}>
        <tbody>
          <tr className={styles.head}>
            <td>{leftTitle}</td>
            <td>{rightTitle}</td>
          </tr>
          <tr>
            <td>
              <div className={styles.gridHeader}>
                <span></span><span>Excellent</span><span>Medium</span><span>Bad</span>
              </div>
              {leftItems.map((item, i) => box(item, i))}
            </td>
            <td>
              <div className={styles.gridHeader}>
                <span></span><span>Excellent</span><span>Medium</span><span>Bad</span>
              </div>
              {rightItems.map((item, i) => box(item, i))}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}