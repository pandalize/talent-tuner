/**
 * CSVファイルを読み込み、データをパースするユーティリティ関数
 */

// タイプの定義
export interface TypeData {
  type: string;
  title: string;
  description: string;
  traits: string[];
  recommendations: string[];
}

/**
 * CSVファイルを読み込み、TypeDataの配列に変換する
 * @param filePath CSVファイルのパス
 * @returns Promise<TypeData[]> 読み込まれたデータ
 */
export async function loadTypesFromCSV(filePath: string): Promise<TypeData[]> {
  try {
    // CSVファイルを取得
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`CSVファイルの読み込みに失敗しました: ${response.statusText}`);
    }

    // テキストとして読み込み
    const csvText = await response.text();
    
    // CSVをパース
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    // ヘッダー行をスキップしてデータ行を処理
    const result: TypeData[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      // 空行をスキップ
      if (!lines[i].trim()) continue;
      
      // 行をカンマで分割（ただし引用符内のカンマは分割しない）
      const values = parseCSVLine(lines[i]);
      
      if (values.length >= 5) {
        const typeData: TypeData = {
          type: values[0],
          title: values[1],
          description: values[2],
          traits: values[3].split(',').map(item => item.trim()),
          recommendations: values[4].split(',').map(item => item.trim())
        };
        
        result.push(typeData);
      }
    }
    
    return result;
  } catch (error) {
    console.error('CSVデータの読み込み中にエラーが発生しました:', error);
    return [];
  }
}

/**
 * CSV行を適切にパースする関数（引用符内のカンマを考慮）
 * @param line CSVの1行
 * @returns string[] パースされた値の配列
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let currentValue = '';
  let insideQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      // 引用符の処理
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      // カンマの処理（引用符の外にある場合のみ）
      result.push(currentValue);
      currentValue = '';
    } else {
      // その他の文字
      currentValue += char;
    }
  }
  
  // 最後の値を追加
  result.push(currentValue);
  
  return result;
}

/**
 * タイプ名からタイプデータを取得する
 * @param types TypeDataの配列
 * @param typeName 検索するタイプ名
 * @returns TypeData | undefined 見つかったタイプデータまたはundefined
 */
export function getTypeByName(types: TypeData[], typeName: string): TypeData | undefined {
  return types.find(type => type.type === typeName);
}