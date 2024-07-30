import { ReactNode } from "react";
import { useLocation } from "react-router-dom"

export function GetActualPath(localPathname: string) {
  const { pathname } = useLocation()
  return localPathname === pathname
}

export function getDominantColor(imageUrl: string, transparency?: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const imgEl = new Image();
    imgEl.src = imageUrl;
    imgEl.crossOrigin = "Anonymous";

    imgEl.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = imgEl.width;
      canvas.height = imgEl.height;

      const ctx = canvas.getContext('2d')!;
      if (!ctx) {
        reject('No se pudo obtener el contexto 2D del canvas');
      }

      ctx.drawImage(imgEl, 0, 0, imgEl.width, imgEl.height);

      const data = ctx.getImageData(0, 0, imgEl.width, imgEl.height).data;
      const r = data[0];
      const g = data[1];
      const b = data[2];

      if (transparency) {
        resolve('rgba(' + (r < 100 ? r + 50 : r) + ',' + (g < 100 ? g + 50 : g) + ',' + (b < 100 ? b + 50 : b) + ',' + transparency + '%)');
      } else {
        resolve('rgb(' + (r < 100 ? r + 50 : r) + ',' + (g < 100 ? g + 50 : g) + ',' + (b < 100 ? b + 50 : b) + ')');
      }
    }
  });
}

export function decodeDate(dateString: DatePattern) {
  return dateString.replace(/-/g, " ")
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function splitArrayComponentsToSubarrays(array: ReactNode[], chunkSize: number) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}