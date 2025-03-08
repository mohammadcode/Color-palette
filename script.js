document.getElementById('imageUpload').addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              const img = new Image();
              img.src = e.target.result;
  
              img.onload = function() {
                  const imageContainer = document.getElementById('imageContainer');
                  imageContainer.innerHTML = '';
                  imageContainer.appendChild(img);
  
                  const colorThief = new ColorThief();
                  const colorPalette = colorThief.getPalette(img, 10); // تعداد رنگ‌هایی که می‌خواهیم استخراج کنیم
  
                  const colorContainer = document.getElementById('colorContainer');
                  colorContainer.innerHTML = '';
  
                  colorPalette.forEach(color => {
                      const colorBox = document.createElement('div');
                      colorBox.className = 'color-box';
                      const hexColor = rgbToHex(color[0], color[1], color[2]);
                      colorBox.style.backgroundColor = hexColor;
                      colorBox.textContent = hexColor;
  
                      const pTag = document.createElement('p');
                      pTag.textContent = hexColor;
                      colorContainer.appendChild(pTag);
                  });
              };
          };
          reader.readAsDataURL(file);
      }
  });
  
  function rgbToHex(r, g, b) {
      return "#" + ((1 << 24) + (