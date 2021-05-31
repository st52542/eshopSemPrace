package ui

import org.junit.jupiter.api.*
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.annotation.Import
import upce.semprace.eshop.EshopApplication
import upce.semprace.eshop.dataFarctory.Creator
import upce.semprace.eshop.repository.UzivatelRepository

@SpringBootTest(classes = EshopApplication.class, webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@Import(Creator.class)
class LoginTests {
    private WebDriver driver;

    @Autowired
    UzivatelRepository uzivatelRepository;

    @Autowired
    Creator creator;

    @BeforeAll
    public static void setupWebdriverChromeDriver() {
        String chromeDriverPath = LoginTests.class.getResource("/chromedriver.exe").getFile();
        System.setProperty("webdriver.chrome.driver", chromeDriverPath);
    }

    @BeforeEach
    public void setup() {
        driver = new ChromeDriver();
        uzivatelRepository.deleteAll();
    }

    @AfterEach
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void userLogin() {
        driver.get("http://localhost:3000/#/signin");
        driver.findElement(By.xpath("//*[contains(text(), 'uzivatelske jmeno')]")).sendKeys("rootroot");
        driver.findElement(By.xpath("//*[contains(text(), 'heslo')]")).sendKeys("rootroot");
        driver.findElement(By.xpath("//*[contains(text(), 'Prihlas')]")).click();
        Assertions.assertEquals(1, driver.findElements(By.xpath("//*[contains(text(), 'Odhlasit')]")).size());
    }

}
