import { jsPDF } from "jspdf" 
import html2canvas from "html2canvas"

export function validateEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export function handleDrag(item) {
  const selectedItem = item.target,
      list = selectedItem.parentNode,
      x = event.clientX,
      y = event.clientY;

  let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);

  if (list === swapItem.parentNode) {
      swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
      list.insertBefore(selectedItem, swapItem);
  }
}

export function pdfOut(sourceElement, filename, doneEvent) {
  var windowHeight = sourceElement.clientHeight;
  var windowWidth = sourceElement.clientWidth;

  var pageWidth = windowWidth;
  var pageHeight = Math.floor(pageWidth*1.414);

  var queued = 0;
  var currentPage = -1;

  var pdf;


  queued = (windowHeight/pageHeight) + 1;

  function checkDone() {
      if (queued < 1) {
          pdf.save(filename+'.pdf');
          doneEvent();
      } else{
          getPage();
      }
  }

  function getPage() {
      currentPage++;
      window.scrollTo(0, currentPage*pageHeight)
      html2canvas(sourceElement,{width: pageWidth, height: pageHeight, y : currentPage*pageHeight}).then(canvas => {
          if (pdf) {
              pdf.addPage([pageWidth, pageHeight])
          } else {
              pdf = new jsPDF("portrait", "pt", [pageWidth, pageHeight], true);
          }

          pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pageWidth, pageHeight,'','FAST');

          queued--;
          checkDone();
      });
  }


  getPage();
}