package ui

import org.junit.jupiter.api.*
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.support.ui.WebDriverWait
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.annotation.Import
import upce.semprace.eshop.EshopApplication
import upce.semprace.eshop.dataFarctory.Creator
import upce.semprace.eshop.repository.UzivatelRepository

@SpringBootTest(classes = EshopApplication.class, webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@Import(Creator.class)
class LoginTest {
    private WebDriver driver;
    String port = 8080

    @Autowired
    UzivatelRepository uzivatelRepository;

    @Autowired
    Creator creator;

    @BeforeAll
    public static void setupWebdriverChromeDriver() {
        String chromeDriverPath = LoginTest.class.getResource("/chromedriver.exe").getFile();
        System.setProperty("webdriver.chrome.driver", chromeDriverPath);
    }

    @BeforeEach
    public void setup() {
        driver = new ChromeDriver();
    }

    @AfterEach
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void userLogin() {
        driver.get("http://localhost:" + port + "/#/signin");
        driver.findElement(By.name("username")).sendKeys("rootroot");
        driver.findElement(By.name("password")).sendKeys("rootroot");
        driver.findElement(By.name("submitButton")).click();

        WebDriverWait wt = new WebDriverWait(driver, 7);
        wt.until(ExpectedConditions.urlContains("#/home"));

       // Assertions.assertEquals(1, driver.findElements(By.xpath("//a[@href='/#/produkt/AdminManagePro']")).size());
    }

}
