"use client"
import React, { useState, useEffect } from 'react'
import calculatePapperRoll from '../../lib/calPaper';

type ResultProp = {
  paperT: string
  orderQ: number
}


export default function Home() {
  const [centerGap, setCenterGap] = useState(4);
  const [slidLR, setSlidLR] = useState(10);

  const [paperW, setPaperW] = useState(1000);
  const [cutterSize, setCutterSize] = useState(2);

  const [isColor, setIsColor] = useState(false);
  const [isNeedMoreGap, setIsNeedMoreGap] = useState(false);

  const [paperWR, setPaperWR] = useState(100);


  const [paperH, setPaperH] = useState(5);
  const [paperGap, setPaperGap] = useState(0.3);
  const [orderQ, setOrderQ] = useState(0);

  const [paperToOrder, setPaperToOrder] = useState<ResultProp[]>(
    [{
      paperT: "ม้วนเล็ก",
      orderQ: 0
    },
    {
      paperT: "ม้วนใหญ่",
      orderQ: 0
    }
    ]);

  useEffect(() => {
    var color_factor = isColor ? 4 : 0
    var gap_factor = isNeedMoreGap ? 2 : 0
    var temp = (paperW * cutterSize) + centerGap + slidLR + color_factor + gap_factor
    setPaperWR(temp)
  }, [centerGap, slidLR, paperW, cutterSize, isColor, isNeedMoreGap])

  useEffect(() => {
    var b = paperH + paperGap

    var paper_m = 100_000 / b
    var paper_s = 50_000 / b

    var q_per_m = Math.floor(paper_m * cutterSize)
    var q_per_s = Math.floor(paper_s * cutterSize)

    var result: ResultProp[] = calculatePapperRoll(orderQ, [q_per_s, q_per_m])
    console.log(result)
    setPaperToOrder([...result])

  }, [paperH, paperGap, orderQ, cutterSize])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-4">

      <div className="text-xl"> คำนวณหน้ากระดาษ</div>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Gap ตรงกลาง (มิลลิเมตร)</span>
        </div>
        <input type="number" defaultValue={centerGap} placeholder="ขนาดหน้ากว้าง" className="input input-bordered w-full max-w-xs" onChange={(e) => setCenterGap(Number(e.target.value))} />
        <div className="label">
        </div>
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">สลิดซ้ายขวา (มิลลิเมตร)</span>
        </div>
        <input type="number" defaultValue={slidLR} placeholder="ขนาดมีด" className="input input-bordered w-full max-w-xs" onChange={(e) => setSlidLR(Number(e.target.value))} />
        <div className="label">
        </div>
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">หน้ากว้าง (มิลลิเมตร)</span>
        </div>
        <input type="number" placeholder="ขนาดหน้ากว้าง" className="input input-bordered w-full max-w-xs" onChange={(e) => setPaperW(Number(e.target.value))} />
        <div className="label">
        </div>
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">มีด (มิลลิเมตร)</span>
        </div>
        <input type="number" placeholder="ขนาดมีด" className="input input-bordered w-full max-w-xs" onChange={(e) => setCutterSize(Number(e.target.value))} />
        <div className="label">
        </div>
      </label>

      <div className='flex gap-8'>
        <label>
          <div className="form-control w-full">
            <label className="label cursor-pointer">
              <span className="label-text px-10"> ทำสี ?</span>
              <input name="color" type="checkbox" defaultChecked={isColor} className="checkbox checkbox-primary" onChange={(e) => setIsColor(e.target.checked)} />
            </label>
          </div>
        </label>
        <label>
          <div className="form-control w-full">
            <label className="label cursor-pointer">
              <span className="label-text px-10"> ดวงห่าง ?</span>
              <input name="gap" type="checkbox" defaultChecked={isNeedMoreGap} className="checkbox checkbox-secondary" onChange={(e) => setIsNeedMoreGap(e.target.checked)} />
            </label>
          </div>
        </label>

      </div>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold text-xl text-rose-400">ต้องสั่งหน้ากระดาษ</span>
        </div>
        <input type="number" className="input input-bordered w-full max-w-xs text-rose-600 font-bold" value={paperWR} readOnly={true} />
        <div className="label">
        </div>
      </label>

      <div className="divider divider-primary"></div>



      <div className="text-xl"> คำนวณจำนวนผลิต</div>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">หน้าสูง (เซนติเมตร)</span>
        </div>
        <input type="number" defaultValue={paperH} placeholder="ขนาดหน้ากว้าง" className="input input-bordered w-full max-w-xs" onChange={(e) => setPaperH(Number(e.target.value))} />
        <div className="label">
        </div>
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text"> Gap (เซนติเมตร)</span>
        </div>
        <input type="number" defaultValue={paperGap} placeholder="ขนาดหน้ากว้าง" className="input input-bordered w-full max-w-xs" onChange={(e) => setPaperGap(Number(e.target.value))} />
        <div className="label">
        </div>
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text"> จำนวนที่จะผลิต (ชิ้น)</span>
        </div>
        <input type="number" defaultValue={orderQ} placeholder="ขนาดหน้ากว้าง" className="input input-bordered w-full max-w-xs" onChange={(e) => setOrderQ(Number(e.target.value))} step={1000} />
        <div className="label">
        </div>
      </label>

      <div className="divider divider-success"></div>

      <label className="form-control w-full max-w-xs ">
        <div className="label">
          <span className="label-text font-bold text-xl text-rose-400"> จำนวนม้วนที่ต้องสั่ง </span>
        </div>
        {
          paperToOrder.map((el, index) => {
            return (
              <div className="label" key={el.paperT}>
                <span className="label-text font-bold text-xl text-rose-400"> {el.paperT} </span>
                <input type="number" defaultValue={el.orderQ} className="input input-bordered w-full max-w-xs" readOnly={true} />
              </div>
            )
          })
        }
        <div className="label">
        </div>
      </label>




    </main>
  );
}
