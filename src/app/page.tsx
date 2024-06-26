"use client"
import React, { useState, useEffect } from 'react'
import calculatePapperRoll from '../../lib/calPaper';
import { useDebounce } from 'use-debounce';

type ResultProp = {
  paperT: string
  orderQ: number
}


export default function Home() {
  const [centerGap, setCenterGap] = useState(4);
  const [slidLR, setSlidLR] = useState(10);

  const [paperW, setPaperW] = useState(100);
  const [cutterSize, setCutterSize] = useState(2);
  const [dbCutterSize] = useDebounce(cutterSize, 500);

  const [isColor, setIsColor] = useState(false);
  const [isNeedMoreGap, setIsNeedMoreGap] = useState(false);

  const [paperWR, setPaperWR] = useState(100);

  const [extendedGap, setExtendedGap] = useState(2);


  const [paperH, setPaperH] = useState(5);
  const [paperGap, setPaperGap] = useState(0.3);
  const [remainInStock, setRemainInStock] = useState(0)
  const [orderQ, setOrderQ] = useState(1000);
  const [prodQ, setProdQ] = useState(1000);

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
    setProdQ(orderQ - remainInStock)
  }, [orderQ, remainInStock])

  useEffect(() => {
    if (!dbCutterSize) return
    if (!paperW) return

    var color_factor = isColor ? 4 : 0
    var gap_factor = isNeedMoreGap ? extendedGap : 0
    var final_paper_w = (paperW * dbCutterSize) + centerGap + slidLR + color_factor + gap_factor 

    setPaperWR(final_paper_w)

  }, [centerGap, slidLR, paperW, dbCutterSize, isColor, isNeedMoreGap, extendedGap])

  useEffect(() => {
    if (prodQ <= 0) return
    if (!cutterSize) return

    var b = paperH + paperGap

    var paper_m = 100_000 / b
    var paper_s = 50_000 / b

    var q_per_m = Math.floor(paper_m * cutterSize)
    var q_per_s = Math.floor(paper_s * cutterSize)

    var result: ResultProp[] = calculatePapperRoll(prodQ, [q_per_s, q_per_m])
    console.log(result)
    setPaperToOrder([...result])

  }, [paperH, paperGap, prodQ, cutterSize])

  return (
    <main data-theme="business" className="flex min-h-screen flex-col items-center justify-between mobile:p-12 p-20 gap-4">
      <div>
        <div className="text-3xl text-sky-600"> คำนวณหน้ากระดาษ</div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-white">Gap ตรงกลาง (มิลลิเมตร)</span>
          </div>
          <input type="number" defaultValue={centerGap} placeholder="ขนาดหน้ากว้าง" className="input input-bordered w-full max-w-xs" onChange={(e) => setCenterGap(Number(e.target.value))} />
          <div className="label">
          </div>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-white">สลิดซ้ายขวา (มิลลิเมตร)</span>
          </div>
          <input type="number" defaultValue={slidLR} placeholder="ขนาดมีด" className="input input-bordered w-full max-w-xs" onChange={(e) => setSlidLR(Number(e.target.value))} />
          <div className="label">
          </div>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-white">หน้ากว้าง (มิลลิเมตร)</span>
          </div>
          <input type="number" defaultValue={paperW} placeholder="ขนาดหน้ากว้าง" className="input input-bordered w-full max-w-xs" onChange={(e) => setPaperW(Number(e.target.value))} />
          <div className="label">
          </div>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-white">มีด (มิลลิเมตร)</span>
          </div>
          <input type="number" defaultValue={cutterSize} placeholder="ขนาดมีด" className="input input-bordered w-full max-w-xs" onChange={(e) => setCutterSize(Number(e.target.value))} />
          <div className="label">
          </div>
        </label>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <div className="form-control">
              <label className="label cursor-pointer gap-2">
                <input name="color" type="checkbox" defaultChecked={isColor} className="checkbox checkbox-info" onChange={(e) => setIsColor(e.target.checked)} />
                <span className="label-text text-white"> สี ?</span>
              </label>
            </div>
          </div>
          <div>
            <div className="form-control">
              <label className="label cursor-pointer gap-2">
                <input name="gap" type="checkbox" defaultChecked={isNeedMoreGap} className="checkbox checkbox-warning" onChange={(e) => setIsNeedMoreGap(e.target.checked)} />
                <span className="label-text text-white"> ดวงห่าง ?</span>
              </label>
            </div>
          </div>

          
        </div>
        {
            isNeedMoreGap ?
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-white">Gap เสริม (มิลลิเมตร)</span>
                </div>
                <input type="number" defaultValue={extendedGap} placeholder="ระยะที่ต้องเพิ่มในกรณีดวงห่าง" className="input input-bordered w-full max-w-xs" onChange={(e) => setExtendedGap(Number(e.target.value))} />
                <div className="label">
                </div>
              </label>

              : <></>
          }

      </div>


      <div className="divider divider-accent"></div>
      <label className="form-control  w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold text-xl text-rose-600">ต้องสั่งหน้ากระดาษ</span>
        </div>
        <input type="number" className="input input-bordered w-full max-w-xs text-rose-100 font-extrabold text-center" value={paperWR} readOnly={true} />
        <div className="label">
        </div>
      </label>

      {/* <div className="grid grid-cols-4 gap-4">
        {
          Array.from({length: 16}, (_, index) => index + 1).map(el => {
            return <div className='card bg-gray-700 w-48 text-center p-4 rounded-sm shadow-md'> {el} </div>
          }) 
        }
      </div> */}

      <div className="divider divider-accent"></div>



      <div className="text-3xl text-sky-600"> คำนวณจำนวนผลิต</div>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text text-white">หน้าสูง (เซนติเมตร)</span>
        </div>
        <input type="number" defaultValue={paperH} placeholder="ขนาดหน้ากว้าง" className="input input-bordered w-full max-w-xs" onChange={(e) => setPaperH(Number(e.target.value))} step={0.5} />
        <div className="label">
        </div>
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text text-white"> Gap (เซนติเมตร)</span>
        </div>
        <input type="number" defaultValue={paperGap} placeholder="ขนาดหน้ากว้าง" className="input input-bordered w-full max-w-xs" onChange={(e) => setPaperGap(Number(e.target.value))} step={0.5} />
        <div className="label">
        </div>
      </label>

      <div className='grid  mobile:grid-cols-2 grid-cols-3 gap-2'>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-white"> จำนวนที่สั่ง (ชิ้น)</span>
          </div>
          <input type="number" defaultValue={orderQ} placeholder="ขนาดหน้ากว้าง" className="input input-bordered w-full max-w-xs" onChange={(e) => setOrderQ(Number(e.target.value))} step={1000} />
          <div className="label">
          </div>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-white"> คงเหลือในสต๊อก (ชิ้น)</span>
          </div>
          <input type="number" defaultValue={remainInStock} placeholder="ขนาดหน้ากว้าง" className="input input-bordered w-full max-w-xs" onChange={(e) => setRemainInStock(Number(e.target.value))} step={50} />
          <div className="label">
          </div>
        </label>

        <label className="form-control w-full max-w-xs mobile:col-span-2">
          <div className="label">
            <span className="label-text text-white"> จำนวนที่ผลิต (ชิ้น)</span>
          </div>
          <input type="number" defaultValue={prodQ} placeholder="ขนาดหน้ากว้าง" className="input input-bordered w-full max-w-xs" readOnly={true} />
          <div className="label">
          </div>
        </label>

      </div>



      <div className="divider divider-accent"></div>
      <label className="form-control w-full max-w-xs ">
        <div className="label">
          <span className="label-text font-extrabold text-xl text-rose-500"> จำนวนม้วนที่ต้องสั่ง </span>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          {
            paperToOrder.map((el, index) => {
              return (
                <div className="label gap-2" key={el.paperT}>
                  <span className="label-text text-sm text-rose-300"> {el.paperT} </span>
                  <input type="number" value={el.orderQ} className="input input-bordered w-full max-w-xs text-rose-100 font-extrabold text-center" readOnly={true} />
                </div>
              )
            })
          }
        </div>
        <div className="label">
        </div>
      </label>

      <div className="divider divider-accent"></div>
    </main>
  );
}
