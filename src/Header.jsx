import { useContext } from "react";
import { ApiContext } from "./ApiContext";

function Header() {

  const { apiType, setApiType } = useContext(ApiContext);

  const handleApiChange = (e) => {
    console.log(e.target.value);
    setApiType(e.target.value);
    console.log(e.target);
  };

  return (
    <nav className="bg-white flex justify-between items-center py-6 max-w-lg sm:max-w-xl md:max-w-5xl px-3 mx-auto">
      <div className="logo w-full">
        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" overflow="hidden"><defs><clipPath id="clip0"><rect x="2944" y="525"/></clipPath><image width="96" height="98" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABiCAMAAACYjiYBAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACHUExURQAAAAAQYBAQUBAQYAgQWAgYWAUVWgsQWgsVWggUXAYTXAYWWQoWWQoWXAgVWwgVWggVXQcVXAcUWwcXWwkUWwgWXAgWXAcVWwcVXQcXWwcVXAkVWgkVXAgVWwgWWwgVXAgWWwgWXAcWXAkWXAcWWwgVXAcWXAkWXAgWWwgWXQcWXAcWXQgWXHqwj6oAAAAsdFJOUwAQEBAgIDAwMEBQUFBQX2Bgb3BwcH+Aj4+PkJCQn5+goKCvr7C/z8/f3+/vW0ruOgAAAAlwSFlzAAALEgAACxIB0t1+/AAAA29JREFUaEOtmeuCmjAQhVOq27pbi8Vqr/Zi664i7/98pXJQk5xJJgnnj5KEwBfmMAOYJFXL1bZZLrA1tarm0A0675dom1Ifzpj+otMMzVOpGs/+qg16ptHshGnv9Al9U6gi8096hB2mdDTZpV5gQlftawwo1TMm9LTFgEJJAJMheBF6U40hRZIBuu6AMUUSQmjQBPelGabimgAhCNB1xfekMEDXfce4bEUAiiM1BlBsthhAj4CReYoDdN0TxmYpDlAWqRqAIrN9xhRh5SOwRMmUbbYNJogpO1KVANlmq7F/XJkIWoBcs+kBMiOVAzT4tZUTqRzgaP7gn60MBA5QCyl6j730kgCkIiM5UiUAqcpIjVQZwJgWW5ZSzcarxaHO2mLLVhoCX4YBwLyiCKehUyl+IcdCkSOkRGoQoEdAg60Us/FMeVtlDqhH4JnyOEe3RLhDb1wc4At6/6vMbEKqvwEY84g2W9pI5QA/0DuoxGwKAClS1+gNSwMgmO0ZvUGpAErMpgIwZo4OWwqzKQHyzcarRQ8g22xCtegDCAjRSOXVIgGQclLMbByAr2yO2fhZCbGRY7YUAMFswUjlAKI/v2KArVCkyrUK1VsMsBVACNUqVKlmSwSQzCa+XUgGSDVbMkCi2TIAhEgVEELVoihuNrpTpNgSlGA2HnIRgASz5QFI+xGEWLUoipN7bxei1aIopdni1aIoGn1upKpTPRF/cnYWV1mrUAlmQ++gEgCV2UoANGYrAzDmF3awdWe2MoC42bQAVXM4d93Lzr8PRMymrBY310+B3mdAjjBGqq5anL2g/SK3+Dmi3dJoNlW16H6qe492KGg2DuAstLuMrb1KIbPxTOncb/04cAYEHnhUACSQ7buZ/HaBA7jVIjkL5zqLr/J4h5Mp36D5Xk4UiGajK+RmSra3cxHEGgz/bLmpXnMAjvBED+ClevbM+hd9V1GzrekS+bUKCXNvEI3ULbvIpFYh1Y93L6RmW5sV/t3JByALTG7mDGFBjkuLLRehJdmIma23o/duiQD0OzvFCX2W9CP1wumcnPB8MreOwJ9VH9B708BpHUH+unpb4sMDmlx9xIBRY8qpryHcvkMT07w+9Bfs9M1PmVf9xDyDfqO1V73v/XDarypsZ+s+ksLP/Lmao4ZpxXUsVrVots3jsBbG/AMvybWLy+BD7wAAAABJRU5ErkJggg==" preserveAspectRatio="none" id="img1"/><clipPath id="clip2"><rect x="0" y="0" width="1928553" height="1968731"/></clipPath></defs><g clipPath="url(#clip0)" transform="translate(-2944 -525)"><g transform="matrix(0.000360892 0 0 0.000360892 2944 525)"><g clipPath="url(#clip2)" transform="matrix(1 0 0 1.0007 -0.270241 -0.0220836)"><use width="100%" height="100%" xlinkHref="#img1" transform="scale(20089.1 20089.1)"/></g></g></g></svg>
      </div>
      <div>
      <div className="flex items-center">
        <label className="mr-4 text-gray-900 dark:text-white">
          <input
            type="radio"
            value="rest"
            name="api_type"
            checked={apiType == 'rest' ? true : false}
            onChange={handleApiChange}
            className="mr-2"
          />
          REST
        </label>
        <label className="text-gray-900 dark:text-white">
          <input
            type="radio"
            value="rest"
            name="api_type"
            checked={apiType == 'rest' ? true : false}
            onChange={handleApiChange}
            className="mr-2"
          />
          GraphQL
        </label>
      </div>
      </div>
    </nav>
  );
}

export default Header;
