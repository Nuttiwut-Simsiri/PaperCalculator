
const innerCalPaper = (remainOrderQ : number, pprs: number [], result : ResultProp[]) => {
    if (remainOrderQ <= 0) return result

    const comp_list = pprs.map( ppr => {
        return remainOrderQ - ppr
    })
    
    const minRemain = Math.min(...comp_list)
    const isEqual = (element : number) => element == minRemain;
    const isGreater = (element : number) => element >= minRemain;
    var resultIndex = 0
    console.log("minRemain ", minRemain)

    if (pprs.findIndex(isGreater) || minRemain == 0) {
        resultIndex = comp_list.findIndex(isEqual)
    }else{
        resultIndex = comp_list.findIndex(isGreater)
    }
    
    
    // update paper order result
    result[resultIndex].orderQ += 1

    return innerCalPaper(comp_list[resultIndex], pprs, result)
}

export default function calculatePapperRoll (orderNumber : number, pprs : number[]){
    console.log("Start Program")
    console.log("OrderNumber is ", orderNumber)
    console.log("pprs ", pprs)
    const final_result : ResultProp[] | undefined = innerCalPaper(orderNumber, pprs, [
        {
            paperT: "s",
            orderQ: 0
        },
        {
            paperT: "b",
            orderQ: 0
        }
    ])
    console.log("final_result ", final_result)
    return final_result

}
