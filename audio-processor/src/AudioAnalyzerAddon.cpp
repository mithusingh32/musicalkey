#include <iostream>

#include "AudioAnalyzerAddon.h"
#include "AudioAnalyzer.h"

#include "Superpowered.h"
#include "SuperpoweredAnalyzer.h"
#include "SuperpoweredDecoder.h"
#include "SuperpoweredSimple.h"

class AudioAnalyzerAddon : public Napi::Addon<AudioAnalyzerAddon>
{
public:
    AudioAnalyzerAddon(Napi::Env env, Napi::Object exports)
    {
        Superpowered::Initialize(
            "ExampleLicenseKey-WillExpire-OnNextUpdate",
            true,  // enableAudioAnalysis (using SuperpoweredAnalyzer, SuperpoweredLiveAnalyzer, SuperpoweredWaveform or SuperpoweredBandpassFilterbank)
            false, // enableFFTAndFrequencyDomain (using SuperpoweredFrequencyDomain, SuperpoweredFFTComplex, SuperpoweredFFTReal or SuperpoweredPolarFFT)
            false, // enableAudioTimeStretching (using SuperpoweredTimeStretching)
            false, // enableAudioEffects (using any SuperpoweredFX class)
            true,  // enableAudioPlayerAndDecoder (using SuperpoweredAdvancedAudioPlayer or SuperpoweredDecoder)
            false, // enableCryptographics (using Superpowered::RSAPublicKey, Superpowered::RSAPrivateKey, Superpowered::hasher or Superpowered::AES)
            false  // enableNetworking (using Superpowered::httpRequest)
        );
            // In the constructor we declare the functions the add-on makes available
    // to JavaScript.
    DefineAddon(exports, {
      InstanceMethod("getAudioData", &AudioAnalyzerAddon::getAudioData)
    });
    }

    Napi::Value getAudioData(const Napi::CallbackInfo &info)
    {
        Napi::Env env = info.Env();
        if (info.Length() < 2)
        {
            Napi::TypeError::New(env, "Wrong number of arguments")
                .ThrowAsJavaScriptException();
            return env.Null();
        }

        if (!info[0].IsString() || !info[1].IsFunction())
        {
            Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
            return env.Null();
        }

        Napi::Function callback = info[1].As<Napi::Function>();
        AudioAnalyzer::AudioAnalyzer *AudioAnalyzer = new AudioAnalyzer::AudioAnalyzer(callback, info[0].As<Napi::String>());
        AudioAnalyzer->Queue();
        return info.Env().Undefined();
    }
};

NODE_API_ADDON(AudioAnalyzerAddon)