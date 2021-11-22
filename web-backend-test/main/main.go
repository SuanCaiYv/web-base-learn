package main

import (
	"bufio"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type User struct {
	Username    string
	Password    string
	Status      int
	CreatedTime time.Time
}

func main() {
	router := gin.Default()
	router.Use(corsMiddleware())
	router.POST("/t1", func(context *gin.Context) {
		input := json2Map(context)
		fmt.Println(input["name"])
		fmt.Println(input["age"])
		user := User{
			Username:    "TestUser",
			Password:    "NoPassword",
			Status:      0,
			CreatedTime: time.Now(),
		}
		context.JSON(http.StatusOK, &user)
	})
	router.GET("/t2/:choice", func(context *gin.Context) {
		choice, _ := strconv.Atoi(context.Param("choice"))
		var file *os.File
		if choice == 0 {
			filePath, _ := filepath.Abs("./main/static/IMG_0923.JPG")
			file, _ = os.Open(filePath)
		} else if choice == 1 {
			filePath, _ := filepath.Abs("./main/static/IMG_9001.JPG")
			file, _ = os.Open(filePath)
		}
		defer func(file *os.File) {
			_ = file.Close()
		}(file)
		fileInfo, _ := file.Stat()
		reader := bufio.NewReader(file)
		contentLength := fileInfo.Size()
		contentType := "application/x-jpg"

		extraHeaders := make(map[string]string)
		extraHeaders["Content-Disposition"] = "attachment; filename=" + "\"" + fileInfo.Name() + "\""

		context.DataFromReader(http.StatusOK, contentLength, contentType, reader, extraHeaders)
	})
	router.POST("/t3", func(context *gin.Context) {
		context.JSON(200, "ok")
	})
	_ = router.Run(":8190")
}

func json2Map(context *gin.Context) map[string]interface{} {
	var input map[string]interface{}
	_ = context.Bind(&input)
	return input
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, HEAD")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
