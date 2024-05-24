type ResultProp = {
    paperT: string
    orderQ: number
}


function innerCalPaper (remainOrderQ : number, pprs: number [], result : ResultProp[]) {
    if (remainOrderQ <= 0) return result

    const comp_list = pprs.map( ppr => {
        return remainOrderQ - ppr
    })
    
    const minRemain = Math.min(...comp_list)

    const isEqual = (element : number) => element == minRemain;
    const isGreater = (element : number) => minRemain >= element;
    var update_index = 0
    
    if (pprs.findIndex(isGreater) || minRemain == 0) {
        update_index = comp_list.findIndex(isEqual)
    }else{
        update_index = comp_list.findIndex(isGreater)
    }


    console.log("--------------------------------------")
    console.log("Before ", remainOrderQ)
    console.log("Selected ", result[update_index]?.paperT)
    console.log("Comp", comp_list)
    console.log("After ", comp_list[update_index])
    // update paper order result
    result[update_index].orderQ += 1
    return innerCalPaper(comp_list[update_index], pprs, result)
}

export default function calculatePapperRoll (orderNumber : number, pprs : number[]){
    console.log("Start Program")
    console.log("OrderNumber is ", orderNumber)
    console.log("pprs ", pprs)
    const final_result : ResultProp[] | undefined = innerCalPaper(orderNumber, pprs, [
        {
            paperT: "ม้วนเล็ก",
            orderQ: 0
        },
        {
            paperT: "ม้วนใหญ่",
            orderQ: 0
        }
    ])
    console.log("final_result ", final_result)
    return final_result

}
