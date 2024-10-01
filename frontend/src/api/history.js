import dummyHistories from "@/data/dummyHistory.json";
import dummySales from "@/data/dummySale.json";

const usingDummyData = true;

export async function getHistory()
{
    if (usingDummyData) {
        return dummyHistories.history.productSale;
    }
    else {
        return null;
    }
}

export async function getSalesData() 
{
    if (usingDummyData) {
        return dummySales.data.sales;
    }
    else {
        return null;
    }
}