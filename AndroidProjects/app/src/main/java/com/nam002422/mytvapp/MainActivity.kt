package com.nam002422.mytvapp
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import kotlinx.coroutines.Runnable
import okhttp3.*
import java.io.IOException
import org.json.JSONObject

class MainActivity : AppCompatActivity() {
    // 5초마다 실행하기 위한 타이머 도구
    private val handler = Handler(Looper.getMainLooper())
    private val isRunning = true

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main) //1. html(xml) 연결

        //2. 화면에 있는 텍스트 요소 가져오기
        val statusText: TextView = findViewById(R.id.statusText)
        statusText.text = "관리자 서버와 연결 중..."

        //3. 하트비트 시작
        startHeartbeat()
    }

    private fun startHeartbeat(){
        val runnable = object : Runnable{
            override fun run() {
                if(!isRunning) return

                //서버 보고
                checkServerCommands()
                // 5초 뒤 다시 코드 실행(재귀)
                handler.postDelayed(this, 5000)
            }
        }

        handler.post(runnable)
    }

    private fun checkServerCommands(){
        val client = OkHttpClient()
        val modeName = android.os.Build.MODEL
    }

}