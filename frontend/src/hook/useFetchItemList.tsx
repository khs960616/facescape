import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import type { ItemType } from '../services/market/utils';
import type { ApiResponse } from '../services/market/apis';

const useFetchItemList = (): ItemType[] | null => {
  const [itemData, setItemData] = useState<ItemType[] | null>(null);
  // 카테고리
  const itemType = useSelector((state: RootState) => state.setItemType);
  // 검색
  const keyword = useSelector((state: RootState) => state.setKeyword);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<ApiResponse[]> = await axios.get(
          'https://jsonplaceholder.typicode.com/users',
          {
            params: {
              itemType: itemType,
              keyword: keyword,
            },
          }
        );
        const allItems = response.data.flatMap((data) => data.items);
        setItemData(allItems);
      } catch (error) {
        console.error('에러났음', error);
      }
    };

    fetchData();
  }, [itemType, keyword]);

  return itemData;
};

export default useFetchItemList;
