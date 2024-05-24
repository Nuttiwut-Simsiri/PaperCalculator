type ResultProp = {
    paperT: string
    orderQ: number
}


function innerCalPaper (remainOrderQ : number, pprs: number [], result : ResultProp[]) {
    if (remainOrderQ <= 0) return result

    const comp_list = pprs.map( ppr => {
        return remainOrderQ - ppr
    })

    console.log("--------------------------------------")
    var minRemain = 0
    if (comp_list.every(el => el >= 0)) {
        minRemain = Math.min(...comp_list)
    }else if (comp_list.some(el => el >= 0)) {
        const comp_list_2 = comp_list.map(eEl => pprs.map(el => eEl - el))
        console.log("comp_list_2 :: ", comp_list_2)
        minRemain = Math.min(...comp_list)
    }else{
        minRemain = Math.max(...comp_list)
    }

    console.log( "minRemain ", minRemain)
    const isEqual = (element : number) => element == minRemain;
    const isGreater = (element : number) => minRemain >= Math.abs(element);
    var update_index = 0
    
    if (pprs.findIndex(isGreater) || minRemain == 0) {
        update_index = comp_list.findIndex(isEqual)
    }else{
        update_index = comp_list.findIndex(isGreater)
    }


    
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
