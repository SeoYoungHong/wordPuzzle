import React, { useEffect, useState, useRef } from "react";
import { Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import CWG from "cwg";
import NestedGrid from "../grid";
import html2canvas from "html2canvas";
import "./wordPuzzleUi20230725.css";
import { jsPDF } from "jspdf";
import CwpViewer from "../document/cwpviewer";
import QuestionViewer from "../document/question";
import Hint from "../document/hint";
import Question from "../document/question";
import Pdfviewer from "../questionviewer/questionviewer";
//https://donggov.tistory.com/204 표만들 때 참고
const doc = new jsPDF({
  orientation: "p", // p: 가로(기본), l: 세로
  unit: "mm", // 단위 : "pt" (points), "mm", "cm", "m", "in" or "px" 등)
  format: "a4", // 포맷 (페이지 크기).
});
const WordPuzzleUi20230725 = (props) => {
  const [page2, setPage2] = useState(0)
  const [inputs, setInputs] = useState({
    startnum: 0,
    endnum: 0,
    choosenum: 0,
    autonum: 0,
    contact: "row",
    filename: "",
  });
  const [page, setPage] = useState(0);
  const [file, setFile] = useState([]);
  const [data, setData] = useState([]);
  const [save, setSave] = useState(false);
  useEffect(() => {
    props.setData(data);
    console.log(data);
  }, [data]);
  const { startnum, endnum, choosenum, autonum, filename, contact } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name, type } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const onChangeFile = async (event) => {
    try {
      let file = event.target.files[0];
      let readFile = (file) =>
        new Promise((resolve, reject) => {
          let reader = new FileReader();
          reader.onload = (e) => resolve(reader.result);

          reader.readAsText(file);
        });
      let csvText = await readFile(file);

      let csvList = csvText.split("\r\n");
      csvList.shift();
      csvList.pop();
      csvList.filter((value, index, arr) => {
        return value !== "";
      });
      csvList = csvList.map((e) => {
        let word = e.split(",");
        let idx = word[0];
        let en = word[1].toString().replace(" ", "");
        let kr = word.slice(2).toString().replaceAll('\"','');
        return {
          idx: idx,
          en: en,
          kr: kr,
        };
      });
      setFile(csvList);
    } catch (e) {
      console.log(e);
    }
  };
  function onChangePage(e, name) {
    if (name == "next" && page < data.length - 1) {
      setPage(page + 1);
    } else if (name == "previus" && page > 0) {
      setPage(page - 1);
    }
    console.log(page);
  }
  function randomchoose(start, end, choose) {
    var randomlist = [];

    if (
      start > 0 &&
      end < file.length + 1 &&
      end - start + 1 >= choose &&
      choose > 1
    ) {
      while (randomlist.length < choose) {
        var random = Math.floor(Math.random() * (end - start + 1));
        if (randomlist.indexOf(random) == -1) {
          randomlist.push(random);
        }
      }
      return randomlist.map((e) => {
        return file[start - 1 + e];
      });
    } else {
      setData([]);
      window.confirm("데이터 범위가 올바르지 않습니다. 다시 확인해주세요.");
      return [];
    }
  }
  function uploadfile() {}
  function create(start, end, choose) {
    let randomdata = randomchoose(start, end, choose);
    if (randomdata.length == 0) {
      return false;
    }
    let worddict = {};
    for (let idx in randomdata) {
      worddict[randomdata[idx]["en"]] = randomdata[idx];
    }
    let wordlist = Object.keys(worddict);
    let count = 0;
    let cwg = false;
    while (count < 10 && cwg == false) {
      cwg = CWG(wordlist);
      if (cwg["height"] > 33 || cwg["width"] > 30) {
        cwg = false;
      }
      count = count + 1;
    }

    return {
      word: worddict,
      cwg: cwg,
    };
  }
  function deleteone() {
    let datalist = data;

    setPage(0);
    if (data.length == 1) {
      setData([]);
    } else {
      datalist.splice(1, 1);

      setData(datalist);
    }
    setPage(0);
  }
  function createone() {
    let start = Number(startnum);
    let end = Number(endnum);
    let choose = Number(choosenum);
    let cwglist = [];
    let count = 0;
    while (cwglist.length < 1 && count < 10) {
      let cwg = create(start, end, choose);
      if (cwg == false) {
        break;
      }
      if (cwg["cwg"] == false) {
        count = count + 1;
      } else {
        cwglist.push(cwg);
        let datalist = data.push(cwg);
        setData(data);
        setPage(data.length - 1);
      }
    }
  }
  function createnew() {
    let start = Number(startnum);
    let end = Number(endnum);
    let choose = Number(choosenum);
    let cwglist = [];
    let count = 0;
    while (cwglist.length < 5 && count < 10) {
      let cwg = create(start, end, choose);
      if (cwg == false) {
        break;
      }
      if (cwg["cwg"] == false) {
        count = count + 1;
      } else {
        cwglist.push(cwg);
      }
    }
    if (cwglist.length < 5) {
      window.confirm("데이터의 범위를 늘려주세요.");
      setData([]);
    } else {
      setData(cwglist);
      window.confirm("새로운 puzzle이 생성되었습니다.");
    }
  }

  function createAuto() {
    let start = 1;
    let end = Number(autonum);
    let choose = end - start + 1;

    let totallist = [];
    while (end <= file.length) {
      let count = 0;
      let cwglist = [];
      while (cwglist.length < 5 && count < 10) {
        let cwg = create(start, end, choose);
        if (cwg == false) {
          break;
        }
        if (cwg["cwg"] == false) {
          count = count + 1;
        } else {
          cwglist.push(cwg);
        }
      }
      totallist = totallist.concat(cwglist);
      for (var total in totallist) {
      }
      if (end == file.length) {
        break;
      }
      start = start + choose;
      end = end + choose;
      if (end > file.length) {
        end = file.length;
      }
      choose = end - start + 1;
    }

    setData(totallist);
    window.confirm("새로운 puzzle이 생성되었습니다.");
  }
  const questionConvert = (data) => {
    console.log(data);
    let height = data["cwg"]["height"];
    let width = data["cwg"]["width"];
    var arr = new Array(height);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = new Array(width);
    }
    console.log(arr);
    let positions = data["cwg"]["positionObjArr"];
    let vertical = [];
    let horizon = [];
    for (var idx = 0; idx < positions.length; idx++) {
      let position = positions[idx];
      let y = position["xNum"];
      let x = position["yNum"];
      var num = 0;
      if (arr[x][y] == null || arr[x][y] == " ") {
        arr[x][y] = (idx + 1).toString();
        num = idx + 1;
      } else {
        num = Number(arr[x][y]);
      }

      if (position["isHorizon"]) {
        horizon.push({
          num: num,
          wordStr: data["word"][position["wordStr"]]["kr"],
        });
        for (var w = 1; w < position["wordStr"].length - 1; w++) {
          if (arr[x][y + w] == null) {
            arr[x][y + w] = " ";
          }
        }
      } else {
        vertical.push({
          num: num,
          wordStr: data["word"][position["wordStr"]]["kr"],
        });
        for (var w = 1; w < position["wordStr"].length - 1; w++) {
          if (arr[x + w][y] == null) {
            arr[x + w][y] = " ";
          }
        }
      }
    }
    const chars = "abcdefghijklmnopqrstuvwxyz";
    if (contact == "row") {
      var arr2 = data["cwg"]["ownerMap"].slice();
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
          if (arr2[i][j] == undefined) {
            arr[i][j] = chars.charAt(Math.floor(Math.random() * chars.length));
          } else {
            arr[i][j] = arr2[i][j];
          }
        }
      }
    }
    return { question: arr, hint: { ver: vertical, hor: horizon } };
    return arr;
  };
  const viewer =
    data.length != 0 ? CwpViewer(data[page2]["cwg"]["ownerMap"]) : null;
  const qustion =
    data.length != 0 ? Question(questionConvert(data[page2])["question"]) : null;
  const hint =
    data.length != 0 ? Hint(questionConvert(data[page2])["hint"]) : null;
  const savePDF = async (e) => {
    // saveCanvas("capture");
    setPage(data.length - 1);
    saveAllcanvas("capture");
  };
  function saveCanvas(id) {
    html2canvas(document.getElementById(id)).then((canvas) => {
      // base64 url 로 변환
      var imgData = canvas.toDataURL("image/jpeg");

      var imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
      var pageHeight = imgWidth * 1.414; // 출력 페이지 세로 길이 계산 A4 기준
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      var margin = 0;

      var doc = new jsPDF("p", "mm", "a4");
      var position = 0;

      // 첫 페이지 출력
      doc.addImage(imgData, "jpeg", margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // 한 페이지 이상일 경우 루프 돌면서 출력
      while (heightLeft >= 20) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "jpeg", margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // 파일 저장
      doc.save(filename + ".pdf");
    });
  }
  async function saveAllcanvas(id) {
    setSave(true);
    // if (page == data.length - 1) {
    //   setPage2(0);
    // }
    var datas = [];
    var doc = new jsPDF("p", "mm", "a4");
    var position = 0;
    // var canvas = await html2canvas(document.getElementById(id));
    // var imgData = canvas.toDataURL("image/jpeg");
    // var imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
    // var pageHeight = imgWidth * 1.414; // 출력 페이지 세로 길이 계산 A4 기준
    // var imgHeight = (canvas.height * imgWidth) / canvas.width;
    // var heightLeft = imgHeight;
    // var margin = 0;

    // doc.addPage();
    // doc.addImage(imgData, "jpeg", margin, position, imgWidth, imgHeight);
    for (var idx = 0; idx < data.length; idx++) {
      if(idx<data.length-1){
        setPage2(idx+1);
      }
      
      var canvas = await html2canvas(document.getElementById(id));
      var imgData = canvas.toDataURL("image/jpeg");
      var imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
      var pageHeight = imgWidth * 1.414; // 출력 페이지 세로 길이 계산 A4 기준
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      var margin = 0;

      doc.addPage();
      doc.addImage(imgData, "jpeg", margin, position, imgWidth, imgHeight);
    }
    doc.save(filename + ".pdf");
    setSave(false);
    setPage2(0)
  }

  return save ? (
    <div>
      저장중
      <div id="capture">
        <Pdfviewer hint={hint} cwp={qustion} header={filename} page={page2} total ={data.length}></Pdfviewer>
        {/* <div>{viewer}</div>
            <br></br>
            <div>{qustion}</div>
            <br></br>
            <div>{hint}</div> */}
      </div>
    </div>
  ) : (
    <legend>
      <div
        data-layer="201f570a-4997-4514-9c4a-506c6beebdfc"
        className="wordPuzzleUi20230725"
      >
        <div>
          <div id="capture">
            <Pdfviewer hint={hint} cwp={qustion} header={filename} page={page} total ={data.length}></Pdfviewer>
            {/* <div>{viewer}</div>
            <br></br>
            <div>{qustion}</div>
            <br></br>
            <div>{hint}</div> */}
          </div>
        </div>{" "}
        <div
          data-layer="5d64da31-c206-4714-870c-e69968233996"
          className="x10"
        ></div>
        <div
          data-layer="36504179-f597-4ed8-a3db-b73ed65d1544"
          className="x11"
        ></div>
        <div
          data-layer="8445f8c4-4d47-4356-b999-fe9e8ad52994"
          className="x1"
        ></div>
        <div
          data-layer="e9effeb5-eead-43b7-8928-0016da487cb0"
          className="x520c84380"
        >
          {" "}
          <div
            data-layer="b258e81c-45b7-42eb-ad95-d93c4ca63f79"
            className="x943df0cac"
          ></div>
          <div
            data-layer="3f0f0bf6-c2ab-4063-bf0c-d24d43f74952"
            className="x6fcdca47"
          >
            <input
              name="startnum"
              type="number"
              placeholder="시작번호"
              onChange={(e) => onChange(e)}
              value={startnum}
              style={{
                height: 91,
                width: 218,
                fontSize: 32,
              }}
            ></input>
            {/* 시작 번호 */}
          </div>
        </div>
        <div
          data-layer="6872406c-4bc3-4934-8795-c9f231cdf335"
          className="x91fded419"
        ></div>
        <div
          data-layer="03af76ae-56e6-4c28-99e3-7e2dc06f2260"
          className="x3da0680a"
        >
          <input
            name="autonum"
            type="number"
            placeholder="희망 갯수"
            onChange={(e) => onChange(e)}
            value={autonum}
            style={{
              height: 91,
              width: 261,
              fontSize: 32,
            }}
          ></input>
          {/* 희망 갯수 */}
        </div>
        <div data-layer="8bb74367-2fa4-47fd-8aff-f685efd0845a" className="x26">
          {" "}
          <div
            data-layer="437d1a0a-814f-4e9a-8ca5-2f8e644661bc"
            className="x92e1dfa6d"
          ></div>
          <div
            data-layer="dda48376-26ec-4026-8ddb-106f62f43fb9"
            className="xb3361dbc"
          >
            <input
              name="filename"
              placeholder="파일 명을 입력해주세요."
              onChange={(e) => onChange(e)}
              value={filename}
              style={{
                height: 91,
                width: 420,
                fontSize: 32,
              }}
            ></input>
            {/* 파일 명을 입력해주세요. */}
          </div>
        </div>
        <div
          data-layer="66c4f481-f5a7-49c0-8f9b-802d60676afe"
          className="x97773f1d8"
        ></div>
        <div
          data-layer="10a783c0-1595-45e4-ba70-26aabd3b3e16"
          className="x999999"
        >
          {page + 1}/ {data.length}
        </div>
        <div
          data-layer="658637e8-999b-4ac8-8ed0-f98de250dd4c"
          className="x6807217d"
        >
          <input
            name="endnum"
            type="number"
            placeholder="마지막 번호"
            onChange={(e) => onChange(e)}
            value={endnum}
            style={{
              height: 91,
              width: 218,
              fontSize: 32,
            }}
          ></input>
          {/* 마지막 번호 */}
        </div>
        <div
          data-layer="dc09a0fc-c03f-49a7-a21a-7185cf3ebed9"
          className="x92f8841e"
        >
          개 씩
        </div>
        <div
          data-layer="2a9236ba-e296-4bd5-9058-f57955927e89"
          className="xee729cb3"
        >
          <input
            type="radio"
            value={"row"}
            name={"contact"}
            defaultChecked={true}
            onChange={(e) => onChange(e)}
            // disabled={disabled}
          />
          저학년용
        </div>
        <div
          data-layer="fb790463-a76d-4266-b080-12da42cb09c5"
          className="xccaf7fd0"
        >
          <input
            type="radio"
            value={"hight"}
            name={"contact"}
            onChange={(e) => onChange(e)}
            // defaultChecked={true}
            // disabled={disabled}
          />
          고학년용
        </div>
        <div
          data-layer="3dd4339f-1027-4bde-a52c-ba1aa614b013"
          className="x6b25a87b"
        >
          개 단어 선택
        </div>
        <div
          data-layer="edc7c336-cfa9-47d9-8b33-012291ce6398"
          className="x13"
        ></div>
        <div
          data-layer="cb83136f-9bcb-4a4a-878b-e6cb7fb541b9"
          className="x5"
        ></div>
        <button onClick={() => uploadfile()}>
          <div
            data-layer="7b9c151a-ad7a-4ef3-97e4-405281d399d3"
            className="x9dcddb62"
            style={{
              marginTop: 20,
              width: 670,
              height: 90,
              textAlign: "center",
            }}
          >
            <input
              type="file"
              name="fileName"
              style={{ fontSize: 32 }}
              onChange={(e) => onChangeFile(e)}
            />
          </div>
        </button>
        <button onClick={() => createnew()}>
          <div
            data-layer="5a3d146a-10b4-4945-ae5a-efef7a093ae2"
            className="x4"
          ></div>

          <div
            data-layer="ff4802b6-7d28-4b86-b92f-1fdd0e6ac36c"
            className="xfb76e7a2"
          >
            새로 만들기
          </div>
        </button>
        <div
          data-layer="db7ad273-f77d-449f-affe-c572496f6531"
          className="x14ebccd32f"
        >
          {/* <div style={{ width: 20, height: 20, background: "black" }}>
            <Link to="/pdf">pdf보기</Link>
          </div> */}
        </div>
        <button onClick={() => createAuto()}>
          <div
            data-layer="c781d921-00dc-4d0b-8dbb-133166431910"
            className="xa8f7ecaa"
          >
            자동으로 만들기
          </div>
        </button>
        <button onClick={savePDF}>
          <div
            data-layer="ffe0157a-f4b9-4557-b573-6fb5ccf49bb4"
            className="x14"
          ></div>

          <div
            data-layer="42f5619c-4d05-4236-b69b-2909c7bc995b"
            className="pdf"
          >
            PDF로 저장
          </div>
        </button>
        <svg
          data-layer="48fe6b12-251f-4020-b186-f9c862925957"
          preserveAspectRatio="none"
          viewBox="0 0 54 54"
          className="x3"
        >
          <path d="M 27 0 C 41.91168594360352 0 54 12.08831310272217 54 27 C 54 41.91168594360352 41.91168594360352 54 27 54 C 12.08831310272217 54 0 41.91168594360352 0 27 C 0 12.08831310272217 12.08831310272217 0 27 0 Z" />
        </svg>
        <svg
          data-layer="081e4e51-c6a1-434f-8d0b-407c013042f3"
          preserveAspectRatio="none"
          viewBox="0 0 54 54"
          className="x7"
        >
          <path d="M 27 0 C 41.91168594360352 0 54 12.08831310272217 54 27 C 54 41.91168594360352 41.91168594360352 54 27 54 C 12.08831310272217 54 0 41.91168594360352 0 27 C 0 12.08831310272217 12.08831310272217 0 27 0 Z" />
        </svg>
        <svg
          data-layer="c8947ff2-b43f-475e-9392-9fc580b2da01"
          preserveAspectRatio="none"
          viewBox="0 0 54 54"
          className="x6"
        >
          <path d="M 27 0 C 41.91168594360352 0 54 12.08831310272217 54 27 C 54 41.91168594360352 41.91168594360352 54 27 54 C 12.08831310272217 54 0 41.91168594360352 0 27 C 0 12.08831310272217 12.08831310272217 0 27 0 Z" />
        </svg>
        <div data-layer="3a6482a3-3419-4522-a5ab-beecbeda4c52" className="x18">
          {" "}
        </div>
        <div
          data-layer="80f1cf22-297e-401b-87f2-1fee4888f6e8"
          className="x4989db39"
          style={{
            display: "inline-block",
            width: "840px",
            height: "820px",
            justifyContent: "center",
            justifyItems: "center",
            overflow: "scroll",
          }}
        >
          {data.length == 0
            ? "파일 업로드 후 단어 퍼즐을 생성해 주세요."
            : NestedGrid(data[page]["cwg"]["ownerMap"])}
        </div>
        <div data-layer="52d0ea2d-18ba-4228-8be5-71726d70bf89" className="x19">
          {" "}
          <div
            data-layer="5580fbc3-30ce-45dc-b53d-7648684b644b"
            className="x12"
          ></div>
          <div
            data-layer="b53aec36-df11-4c08-b51c-32ca1884b5b0"
            className="xed8cf0ba"
          >
            <input
              name="choosenum"
              type="number"
              placeholder="사용할 단어 갯수"
              onChange={(e) => onChange(e)}
              min={2}
              value={choosenum}
              style={{
                height: 91,
                width: 326,
                fontSize: 32,
              }}
            ></input>
            {/* 사용할 단어 갯수 */}
          </div>
        </div>
        <div
          data-layer="a5fce72d-463a-4faa-95b2-a06df8c7131e"
          className="xd393c20f"
        >
          번 에서
        </div>
        <div data-layer="fb6d343f-0ca6-458e-b06e-acd1b2ee64f2" className="x">
          번 중
        </div>
        <div
          data-layer="4f50ca63-7e03-477c-aff1-0e586d31a684"
          className="x28846"
        ></div>
        <button name="previus" onClick={(e) => onChangePage(e, "previus")}>
          <div
            data-layer="d38d0032-6092-40b0-8e78-6b7d25a8c10b"
            className="x37133"
          >
            {" "}
            <div
              data-layer="f47ba68f-c65d-47b4-91ed-6ce886763d8b"
              className="x2884773989dcb"
            ></div>
            <svg
              data-layer="3cbff008-d548-44b0-9301-ebca50a5e982"
              preserveAspectRatio="none"
              viewBox="-1.5 -1.5 27 15"
              className="x13326e4af83b5"
            >
              <path d="M 0 12 L 12 0 L 24 12" />
            </svg>
          </div>
        </button>
        <button name="next" onClick={(e) => onChangePage(e, "next")}>
          <div
            data-layer="71fcc9c5-6903-4c6f-889f-a6d82b40e7fb"
            className="x37134"
          >
            {" "}
            <div
              data-layer="479c8b34-9470-42e3-8569-a8448fc3ff12"
              className="x28847"
            ></div>
            <svg
              data-layer="adc86455-cc9e-4216-afcc-2f87f851c641"
              preserveAspectRatio="none"
              viewBox="-1.5 -1.5 27 15"
              className="x13326"
            >
              <path d="M 0 12 L 12 0 L 24 12" />
            </svg>
          </div>
        </button>
        <button onClick={() => deleteone()}>
          <div
            data-layer="69dba013-6855-4a76-870a-b4403f67eca1"
            className="x37135"
          >
            {" "}
            <div
              data-layer="e8e2882d-d9e3-460a-a9cc-016d2bcaa595"
              className="x947270666"
            ></div>
            <div
              data-layer="80f128c6-d56a-4097-926e-1aa20b818ec6"
              className="x37130"
            >
              {" "}
              <div
                data-layer="c88242a8-4505-4474-8e46-25737281d579"
                className="x193eef05"
              >
                삭제
              </div>
              <div
                data-layer="52f5a194-b841-4e84-9e55-3d00b94c4926"
                className="x35"
              >
                {" "}
                <div
                  data-layer="69a172ff-c084-40d1-bef1-532b7cf6fe1b"
                  className="x37127"
                >
                  {" "}
                  <div
                    data-layer="c87a73ca-eb05-4a50-bdd1-e28e31b39fd8"
                    className="x36302"
                  ></div>
                  <svg
                    data-layer="5106c866-e52c-4207-9d08-7164d4504281"
                    preserveAspectRatio="none"
                    viewBox="-1 -1 24 2"
                    className="x784"
                  >
                    <path d="M 0 0 L 22 0" />
                  </svg>
                  <svg
                    data-layer="6ebd5caa-17e7-47d9-b307-9dd355c3f994"
                    preserveAspectRatio="none"
                    viewBox="-3822.5 708.5 13 7"
                    className="x15225"
                  >
                    <path d="M -3821 714 L -3821 710 L -3811 710 L -3811 714" />
                  </svg>
                  <svg
                    data-layer="520006ba-e99c-4bae-9565-b2e304994bea"
                    preserveAspectRatio="none"
                    viewBox="-1 -1 2 8"
                    className="x785"
                  >
                    <path d="M 0 0 L 0 6" />
                  </svg>
                  <svg
                    data-layer="c968c635-5657-42f9-9a08-1a94004d22ef"
                    preserveAspectRatio="none"
                    viewBox="-1 -1 2 8"
                    className="x786"
                  >
                    <path d="M 0 0 L 0 6" />
                  </svg>
                  <div
                    data-layer="3aa70501-6133-4cee-99bd-c997adee0178"
                    className="x36303"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </button>
        <button
          onClick={() => {
            createone();
          }}
        >
          <div
            data-layer="cc1974dd-a8bb-4612-8e6e-46d4d6259c25"
            className="x37136"
          >
            {" "}
            <div
              data-layer="467a9bc3-1682-468e-93d6-7b4fc83e61e3"
              className="x9"
            ></div>
            <div
              data-layer="a02d3e5f-4107-4773-bd75-dd2e2ba640b4"
              className="x37132"
            >
              {" "}
              <div
                data-layer="18864a03-175d-4a73-a222-52cd80fd6091"
                className="x0097c03b"
              >
                추가
              </div>
              <div
                data-layer="415eb980-96dd-494d-886c-e1d78f4a34d6"
                className="x37128"
              >
                {" "}
                <div
                  data-layer="9147f93e-73a4-4ffc-9bf5-344c035f8818"
                  className="x32902"
                >
                  {" "}
                  <div
                    data-layer="1798bc81-7c01-4551-96f4-ba2be02af67d"
                    className="x33144"
                  >
                    {" "}
                    <div
                      data-layer="429ae08b-8060-4afc-94d9-4cb7703d9b07"
                      className="x31106"
                    ></div>
                    <div
                      data-layer="0015ba19-dddb-4b66-b188-e694f9b61025"
                      className="x31107"
                    ></div>
                  </div>
                </div>
                <div
                  data-layer="fd262f37-d651-4a1b-a0b2-3a0bd370dd80"
                  className="x33143"
                >
                  {" "}
                  <div
                    data-layer="b3842a2a-92fe-4f8c-a393-b0f2a14d26d4"
                    className="x193"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    </legend>
  );
};

export default WordPuzzleUi20230725;
