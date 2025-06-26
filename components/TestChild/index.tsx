"use client";
import "../../css/test.css";
function TestChild() {
  const wm = new Map();
  let obj: object | null = {};

  wm.set(obj, "secret");
  console.log("1111",wm);
  console.log(wm.get(obj)); // "secret"
  obj = null;

  return (
    <>
      <div className="container1">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 1000</div>
        <div>Item 2000</div>
        <div>Item 30000</div>
      </div>
      <div className="container2">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 1111</div>
        <div>Item 21111</div>
        <div>Item 31111</div>
        <div>Item 1</div>

        <div>Item 3</div>
      </div>
    </>
  );
}
export default TestChild;
